import { ClassValidator, File } from "../../src";
import { IGenericFile } from "../../src/utils/file/IGenericFile";

@ClassValidator
class UserProfile {
      @File({
        mimeTypes: ['image/jpeg', 'image/png'],
        maxSize: 5000000, // 5MB
        minSize: 10000, // 10KB
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        validateFileName: (fileName: string) => !fileName.includes(' '),
        validateFileContent: (fileBuffer: Buffer) => fileBuffer.length > 0
    })
    avatar: IGenericFile;


    constructor(avatar: IGenericFile) {
        this.avatar = avatar;
    }
}

function createFile(originalName: string, size: number, mimeType: string): IGenericFile {
  const buffer = Buffer.alloc(size);

  return {
      originalName,
      size,
      mimeType,
      buffer
  };
}

describe('UserProfile with File Decorator', () => {
  it('should accept a valid file', () => {
      const validFile = createFile('image.png', 1024 * 1024, 'image/png');
      expect(() => new UserProfile(validFile)).not.toThrow();
  });

  it('should reject a file with invalid MIME type', () => {
      const invalidMIMEFile = createFile('document.pdf', 1024 * 1024, 'application/pdf');
      expect(() => new UserProfile(invalidMIMEFile)).toThrow('Validation failed:');
  });

  it('should reject a file that is too large', () => {
      const largeFile = createFile('large-image.png', 10 * 1024 * 1024, 'image/png'); // 10MB
      expect(() => new UserProfile(largeFile)).toThrow('Validation failed:');
  });
});
