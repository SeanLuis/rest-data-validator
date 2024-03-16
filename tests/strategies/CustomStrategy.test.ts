import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { CustomStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("CustomStrategy", () => {
  let customStrategy: CustomStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile(
      "test.ts",
      "class TestClass { testProperty: string; }"
    );
    const realClassDeclaration = mockSourceFile.getClasses()[0];
    mockClasses = [realClassDeclaration];

    // Mock addDecorator
    mockClasses[0].getProperties()[0].addDecorator = jest.fn();

    customStrategy = new CustomStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute custom strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      validationName: "testValidation",
      property: "testProperty",
      message: "Test message",
    });

    await customStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const validationName = lastCall.arguments[0].match(/name: \"(.*?)\"/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Custom");
    // Verify the properties
    expect(validationName).toBe("testValidation");
    expect(message).toBe("Test message");
  });
});
