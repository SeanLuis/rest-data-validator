import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { EnumStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("EnumStrategy", () => {
  let enumStrategy: EnumStrategy;
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

    enumStrategy = new EnumStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute enum strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      enum: "Option1, Option2, Option3",
      message: "Invalid option",
    });

    await enumStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const enumValues = lastCall.arguments[0].match(/enum: \[(.*?)\]/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Enum");
    // Verify the properties
    expect(enumValues).toBe('"Option1","Option2","Option3"');
    expect(message).toBe("Invalid option");
  });
});
