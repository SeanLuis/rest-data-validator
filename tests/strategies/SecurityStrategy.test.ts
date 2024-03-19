import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { securityStrategies } from "../../src/utils/validations/SecurityStrategies";
import { SecurityStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("SecurityValidationStrategy", () => {
  let securityValidationStrategy: SecurityStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile(
      "test.ts",
      "class TestClass { testProperty: string; }"
    );
    mockClasses = [mockSourceFile.getClasses()[0]];

    mockClasses[0].getProperties()[0].addDecorator = jest.fn();

    securityValidationStrategy = new SecurityStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute security validation strategy", async () => {
    const strategyNames = Object.keys(securityStrategies);
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      property: "testProperty",
      strategy: strategyNames[0],
      message: "Potential XSS detected",
    });

    await securityValidationStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    const strategyMatch = lastCall.arguments[0].match(/type: \"(.*?)\"/);
    const messageMatch = lastCall.arguments[0].match(/message: \"(.*?)\"/);

    if (strategyMatch && messageMatch) {
      const strategyName = strategyMatch[1];
      const message = messageMatch[1];

      expect(lastCall.name).toBe("Security");
      expect(strategyName).toBe(strategyNames[0]);
      expect(message).toBe("Potential XSS detected");
    }
  });
});
