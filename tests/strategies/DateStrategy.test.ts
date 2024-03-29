import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { DateStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("DateStrategy", () => {
  let dateStrategy: DateStrategy;
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

    dateStrategy = new DateStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute date strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      property: "testProperty",
      format: "YYYY-MM-DD",
      before: "2023-12-31",
      after: "2022-01-01",
      message: "Test message",
    });

    await dateStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const format = lastCall.arguments[0].match(/format: \"(.*?)\"/)[1];
    const before = lastCall.arguments[0].match(/before: \"(.*?)\"/)[1];
    const after = lastCall.arguments[0].match(/after: \"(.*?)\"/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Date");
    // Verify the properties
    expect(format).toBe("YYYY-MM-DD");
    expect(before).toBe("2023-12-31");
    expect(after).toBe("2022-01-01");
    expect(message).toBe("Test message");
  });
});
