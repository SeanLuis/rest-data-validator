import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { RangeStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("RangeStrategy", () => {
  let rangeStrategy: RangeStrategy;
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

    rangeStrategy = new RangeStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute range strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      min: "1",
      max: "10",
      inclusive: true,
      step: "2",
      dateFormat: "YYYY-MM-DD",
      message: "Invalid range",
    });

    await rangeStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const min = lastCall.arguments[0].match(/min: (.*?),/)[1];
    const max = lastCall.arguments[0].match(/max: (.*?),/)[1];
    const inclusive = lastCall.arguments[0].match(/inclusive: (.*?),/)[1];
    const step = lastCall.arguments[0].match(/step: (.*?),/)[1];
    const dateFormat = lastCall.arguments[0].match(/dateFormat: \"(.*?)\"/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Range");
    // Verify the properties
    expect(min).toBe("1");
    expect(max).toBe("10");
    expect(inclusive).toBe("true");
    expect(step).toBe("2");
    expect(dateFormat).toBe("YYYY-MM-DD");
    expect(message).toBe("Invalid range");
  });
});
