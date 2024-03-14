import inquirer from "inquirer";
import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { FileStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("FileStrategy", () => {
  let fileStrategy: FileStrategy;
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

    fileStrategy = new FileStrategy(mockProject, mockSourceFile, mockClasses);
  });

  it("should execute file strategy", async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValueOnce({
      property: "testProperty",
      mimeTypes: "image/jpeg,image/png",
      maxSize: "5000000",
      minSize: "1000",
      allowedExtensions: ".jpg,.png",
      disallowedExtensions: ".gif,.bmp",
      message: "Invalid file",
    });

    await fileStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const mimeTypes = lastCall.arguments[0].match(/mimeTypes: \[(.*?)\]/)[1];
    const maxSize = lastCall.arguments[0].match(/maxSize: (.*?),/)[1];
    const minSize = lastCall.arguments[0].match(/minSize: (.*?),/)[1];
    const allowedExtensions = lastCall.arguments[0].match(
      /allowedExtensions: \[(.*?)\]/
    )[1];
    const disallowedExtensions = lastCall.arguments[0].match(
      /disallowedExtensions: \[(.*?)\]/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("File");
    // Verify the properties
    expect(mimeTypes).toBe('"image/jpeg","image/png"');
    expect(maxSize).toBe("5000000");
    expect(minSize).toBe("1000");
    expect(allowedExtensions).toBe('".jpg",".png"');
    expect(disallowedExtensions).toBe('".gif",".bmp"');
    expect(message).toBe("Invalid file");
  });
});
