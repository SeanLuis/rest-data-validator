import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { ContextualStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("ContextualStrategy", () => {
  let contextualStrategy: ContextualStrategy;
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

    contextualStrategy = new ContextualStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute contextual strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      validationName: "testValidation",
      property: "testProperty",
      contextKey: "testContextKey",
      message: "Test message",
    });

    await contextualStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const validationName = lastCall.arguments[0].match(/name: \"(.*?)\"/)[1];
    const contextKey = lastCall.arguments[0].match(
      /getContext: \(\) => getContext\(\"(.*?)\"\)/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Contextual");
    // Verify the properties
    expect(validationName).toBe("testValidation");
    expect(contextKey).toBe("testContextKey");
    expect(message).toBe("Test message");
  });
});
