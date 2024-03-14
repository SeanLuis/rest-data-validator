import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { EmailStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("EmailStrategy", () => {
  let emailStrategy: EmailStrategy;
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

    emailStrategy = new EmailStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute email strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      regexPattern:
        "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)*(\\.[a-zA-Z]{2,})$",
      message: "Invalid email",
    });

    await emailStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const regexPattern = lastCall.arguments[0].match(
      /regexPattern: new RegExp\(\"(.*?)\"\)/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Email");
    // Verify the properties
    expect(regexPattern).toBe(
      "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)*(\\.[a-zA-Z]{2,})$"
    );
    expect(message).toBe("Invalid email");
  });
});
