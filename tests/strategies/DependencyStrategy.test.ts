import { Project, ClassDeclaration, SourceFile, PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { DependencyStrategy } from "../../src/cli/strategies";

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('DependencyStrategy', () => {
  let dependencyStrategy: DependencyStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile('mockFile.ts');

    const realClassDeclaration = mockSourceFile.addClass({ name: 'TestClass' });

    const mockProperty = {
      getName: jest.fn().mockReturnValue('testProperty'),
      addDecorator: jest.fn(),
    } as unknown as PropertyDeclaration;

    realClassDeclaration.getProperties = jest.fn().mockReturnValue([mockProperty]);

    mockClasses = [realClassDeclaration];

    dependencyStrategy = new DependencyStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it('should execute dependency strategy', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      validationName: 'testValidation',
      property: 'testProperty',
      dependency: 'testDependency',
      message: 'Test message',
    });

    await dependencyStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();
    const lastCall = (mockClasses[0].getProperties()[0].addDecorator as jest.Mock).mock.calls[0][0];

    const validationNameMatch = lastCall.arguments[0].match(/name: \"(.*?)\"/);
    const dependencyMatch = lastCall.arguments[0].match(/getDependencies: \(instance: ${mockClasses[0].getName()}\) => \({ (.*?): instance.\1 }\)/);
    const messageMatch = lastCall.arguments[0].match(/message: \"(.*?)\"/);

    if (validationNameMatch && dependencyMatch && messageMatch) {
      const validationName = validationNameMatch[1];
      const dependency = dependencyMatch[1];
      const message = messageMatch[1];

      expect(lastCall.name).toBe('Dependency');
      expect(validationName).toBe('testValidation');
      expect(dependency).toBe('testDependency');
      expect(message).toBe('Test message');
    }
  });
});