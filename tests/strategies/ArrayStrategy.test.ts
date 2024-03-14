import { Project, ClassDeclaration, SourceFile, PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ArrayStrategy } from "../../src/cli/strategies";

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('ArrayStrategy', () => {
  let arrayStrategy: ArrayStrategy;
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

    arrayStrategy = new ArrayStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it('should execute array strategy', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      property: 'testProperty',
      minLength: 1,
      maxLength: 10,
      unique: true,
      message: 'Test message',
    });

    await arrayStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (mockClasses[0].getProperties()[0].addDecorator as jest.Mock).mock.calls[0][0];

    // Extract the properties from the string
    const minLength = lastCall.arguments[0].match(/minLength: (\d+)/)[1];
    const maxLength = lastCall.arguments[0].match(/maxLength: (\d+)/)[1];
    const unique = lastCall.arguments[0].match(/unique: (true|false)/)[1] === 'true';
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe('Array');
    // Verify the properties
    expect(minLength).toBe('1');
    expect(maxLength).toBe('10');
    expect(unique).toBe(true);
    expect(message).toBe('Test message');
  });
});