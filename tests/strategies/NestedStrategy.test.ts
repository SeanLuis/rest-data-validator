import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { NestedStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("NestedStrategy", () => {
  let nestedStrategy: NestedStrategy;
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

    nestedStrategy = new NestedStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute nested strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      validator: "UserValidator",
      each: true,
      message: "Invalid nested object",
    });

    await nestedStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const validator = lastCall.arguments[0].match(/validator: (.*?),/)[1];
    const each = lastCall.arguments[0].match(/each: (.*?),/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Nested");
    // Verify the properties
    expect(validator).toBe("UserValidator");
    expect(each).toBe("true");
    expect(message).toBe("Invalid nested object");
  });
});
