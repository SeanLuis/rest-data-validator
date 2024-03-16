import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { PasswordStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("PasswordStrategy", () => {
  let passwordStrategy: PasswordStrategy;
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

    passwordStrategy = new PasswordStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute password strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      minLength: "8",
      maxLength: "20",
      regexPattern: "[a-zA-Z0-9]*",
      mustContainLowercase: true,
      mustContainUppercase: true,
      mustContainNumber: true,
      mustContainSpecialCharacter: true,
      message: "Invalid password",
    });

    await passwordStrategy.execute();

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
    const mustContainLowercase = lastCall.arguments[0].match(
      /mustContainLowercase: (.*?),/
    )[1];
    const mustContainUppercase = lastCall.arguments[0].match(
      /mustContainUppercase: (.*?),/
    )[1];
    const mustContainNumber = lastCall.arguments[0].match(
      /mustContainNumber: (.*?),/
    )[1];
    const mustContainSpecialCharacter = lastCall.arguments[0].match(
      /mustContainSpecialCharacter: (.*?),/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Password");
    // Verify the properties
    expect(minLength).toBe("8");
    expect(maxLength).toBe("20");
    expect(regexPattern).toBe("[a-zA-Z0-9]*");
    expect(mustContainLowercase).toBe("true");
    expect(mustContainUppercase).toBe("true");
    expect(mustContainNumber).toBe("true");
    expect(mustContainSpecialCharacter).toBe("true");
    expect(message).toBe("Invalid password");
  });
});
