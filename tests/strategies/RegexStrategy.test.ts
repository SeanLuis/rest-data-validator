import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { RegexStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("RegexStrategy", () => {
  let regexStrategy: RegexStrategy;
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

    regexStrategy = new RegexStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute regex strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      pattern: "[a-zA-Z0-9]*",
      flags: "g",
      invertMatch: false,
      testAgainstTrimmedValue: true,
      allowEmptyString: false,
      message: "Invalid input",
    });

    await regexStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const pattern = lastCall.arguments[0].match(/pattern: \/(.*?)\//)[1];
    const flags = lastCall.arguments[0]
      .match(/\/(.*?),/)[1]
      .replace(`${pattern}/`, "");
    const invertMatch = lastCall.arguments[0].match(/invertMatch: (.*?),/)[1];
    const testAgainstTrimmedValue = lastCall.arguments[0].match(
      /testAgainstTrimmedValue: (.*?),/
    )[1];
    const allowEmptyString = lastCall.arguments[0].match(
      /allowEmptyString: (.*?),/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Regex");
    // Verify the properties
    expect(pattern).toBe("[a-zA-Z0-9]*");
    expect(flags).toBe("g");
    expect(invertMatch).toBe("false");
    expect(testAgainstTrimmedValue).toBe("true");
    expect(allowEmptyString).toBe("false");
    expect(message).toBe("Invalid input");
  });
});
