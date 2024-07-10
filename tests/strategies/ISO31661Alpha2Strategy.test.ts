import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { ISO31661Alpha2Strategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("ISO31661Alpha2Strategy", () => {
  let iso31661Alpha2Strategy: ISO31661Alpha2Strategy;
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

    iso31661Alpha2Strategy = new ISO31661Alpha2Strategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute ISO31661Alpha2 strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      message: "Invalid country code",
    });

    await iso31661Alpha2Strategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    expect(lastCall.name).toBe("ISO31661Alpha2");
    expect(message).toBe("Invalid country code");
  });
});
