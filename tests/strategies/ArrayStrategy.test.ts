import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { ArrayStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("ArrayStrategy", () => {
  let arrayStrategy: ArrayStrategy;
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

    arrayStrategy = new ArrayStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute array strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      property: "testProperty",
      minLength: 1,
      maxLength: 10,
      unique: true,
      message: "Test message",
    });

    await arrayStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const minLength = lastCall.arguments[0].match(/minLength: (\d+)/)[1];
    const maxLength = lastCall.arguments[0].match(/maxLength: (\d+)/)[1];
    const unique =
      lastCall.arguments[0].match(/unique: (true|false)/)[1] === "true";
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Array");
    // Verify the properties
    expect(minLength).toBe("1");
    expect(maxLength).toBe("10");
    expect(unique).toBe(true);
    expect(message).toBe("Test message");
  });

  it("should not add decorator if property not found", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      property: "nonexistentProperty",
      minLength: 1,
      maxLength: 10,
      unique: true,
      message: "Test message",
    });

    await arrayStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Check that addDecorator was not called
    expect(
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).not.toHaveBeenCalled();
  });
});
