import { Project, ClassDeclaration, SourceFile, PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ContextualStrategy } from "../../src/cli/strategies";

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('ContextualStrategy', () => {
  let contextualStrategy: ContextualStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile('mockFile.ts');

    // Create an actual instance of ClassDeclaration
    const realClassDeclaration = mockSourceFile.addClass({ name: 'TestClass' });

    // Create a PropertyDeclaration mock
    const mockProperty = {
      getName: jest.fn().mockReturnValue('testProperty'),
      addDecorator: jest.fn(),
    } as unknown as PropertyDeclaration;

    // Mock the getProperties method
    realClassDeclaration.getProperties = jest.fn().mockReturnValue([mockProperty]);

    // Add the instance to mockClasses
    mockClasses = [realClassDeclaration];

    contextualStrategy = new ContextualStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it('should execute contextual strategy', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      validationName: 'testValidation',
      property: 'testProperty',
      contextKey: 'testContextKey',
      message: 'Test message',
    });

    await contextualStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (mockClasses[0].getProperties()[0].addDecorator as jest.Mock).mock.calls[0][0];

    // Extract the properties from the string
    const validationName = lastCall.arguments[0].match(/name: \"(.*?)\"/)[1];
    const contextKey = lastCall.arguments[0].match(/getContext: \(\) => getContext\(\"(.*?)\"\)/)[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe('Contextual');
    // Verify the properties
    expect(validationName).toBe('testValidation');
    expect(contextKey).toBe('testContextKey');
    expect(message).toBe('Test message');
  });
});