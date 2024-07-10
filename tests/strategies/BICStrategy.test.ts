import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { BICStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("BICStrategy", () => {
  let bicStrategy: BICStrategy;
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

    bicStrategy = new BICStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute BIC strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      message: "Invalid BIC",
    });

    await bicStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    expect(lastCall.name).toBe("BIC");
    expect(message).toBe("Invalid BIC");
  });
});
