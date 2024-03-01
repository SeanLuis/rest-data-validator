import { ClassValidator, FileValidator } from "../../src";
import { IGenericFile } from "../../src/utils/file/IGenericFile";

@ClassValidator
class UserProfile {
      @FileValidator({
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

// Simula la creación de un objeto de archivo para pruebas
function createFile(originalName: string, size: number, mimeType: string): IGenericFile {
  // Simula el contenido del archivo como un Buffer. En un escenario real, esto representaría los datos binarios del archivo.
  const buffer = Buffer.alloc(size);

  // Retorna un objeto que cumple con IGenericFile, con las propiedades proporcionadas y el buffer simulado.
  return {
      originalName,
      size,
      mimeType,
      buffer
  };
}


// Suponiendo que tienes una forma de simular o crear objetos de archivo (File) para pruebas
describe('UserProfile with FileValidator Decorator', () => {
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
