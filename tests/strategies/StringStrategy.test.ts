import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { StringStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("StringStrategy", () => {
  let stringStrategy: StringStrategy;
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

    stringStrategy = new StringStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute string strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      minLength: "5",
      maxLength: "10",
      regexPattern: "[a-zA-Z0-9]*",
      message: "Invalid input",
    });

    await stringStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const minLength = lastCall.arguments[0].match(/minLength: (.*?),/)[1];
    const maxLength = lastCall.arguments[0].match(/maxLength: (.*?),/)[1];
    const regexPattern = lastCall.arguments[0].match(
      /regexPattern: \/(.*?)\//
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("String");
    // Verify the properties
    expect(minLength).toBe("5");
    expect(maxLength).toBe("10");
    expect(regexPattern).toBe("[a-zA-Z0-9]*");
    expect(message).toBe("Invalid input");
  });
});
