import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { NumberStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("NumberStrategy", () => {
  let numberStrategy: NumberStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile(
      "test.ts",
      "class TestClass { testProperty: number; }"
    );
    const realClassDeclaration = mockSourceFile.getClasses()[0];
    mockClasses = [realClassDeclaration];

    // Mock addDecorator
    mockClasses[0].getProperties()[0].addDecorator = jest.fn();

    numberStrategy = new NumberStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute number strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      min: "1",
      max: "10",
      integerOnly: true,
      positiveOnly: true,
      negativeOnly: false,
      precision: "2",
      divisibleBy: "2",
      notEqualTo: "3,4",
      equalTo: "5,6",
      message: "Invalid number",
    });

    await numberStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const min = lastCall.arguments[0].match(/min: (.*?),/)[1];
    const max = lastCall.arguments[0].match(/max: (.*?),/)[1];
    const integerOnly = lastCall.arguments[0].match(/integerOnly: (.*?),/)[1];
    const positiveOnly = lastCall.arguments[0].match(/positiveOnly: (.*?),/)[1];
    const negativeOnly = lastCall.arguments[0].match(/negativeOnly: (.*?),/)[1];
    const precision = lastCall.arguments[0].match(/precision: (.*?),/)[1];
    const divisibleBy = lastCall.arguments[0].match(/divisibleBy: (.*?),/)[1];
    const notEqualTo = lastCall.arguments[0].match(/notEqualTo: \[(.*?)\],/)[1];
    const equalTo = lastCall.arguments[0].match(/equalTo: \[(.*?)\],/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Number");
    // Verify the properties
    expect(min).toBe("1");
    expect(max).toBe("10");
    expect(integerOnly).toBe("true");
    expect(positiveOnly).toBe("true");
    expect(negativeOnly).toBe("false");
    expect(precision).toBe("2");
    expect(divisibleBy).toBe("2");
    expect(notEqualTo).toBe("3,4");
    expect(equalTo).toBe("5,6");
    expect(message).toBe("Invalid number");
  });
});
