import { validateFile } from "../../src";
import { IFileValidationOptions } from "../../src/interfaces/IFileValidationOptions";
import { IGenericFile } from "../../src/utils/file/IGenericFile";

describe('validateFile', () => {
    const mockFile: IGenericFile = {
        originalName: 'testImage.png',
        mimeType: 'image/png',
        size: 1024, // 1KB
        buffer: Buffer.from('Some file content here', 'utf-8')
    };

    it('should pass validation with default options', () => {
        const result = validateFile(mockFile);
        expect(result.isValid).toBeTruthy();
    });

    it('should fail for disallowed MIME type', () => {
        const options: IFileValidationOptions = {
            mimeTypes: ['image/jpeg', 'image/gif']
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`Disallowed MIME type: ${mockFile.mimeType}.`);
    });

    it('should fail if file size exceeds the maximum allowed limit', () => {
        const options: IFileValidationOptions = {
            maxSize: 512 // 512 bytes
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`File size exceeds the maximum allowed limit of ${options.maxSize} bytes.`);
    });

    it('should fail if file size is below the minimum required limit', () => {
        const options: IFileValidationOptions = {
            minSize: 2048 // 2KB
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`File size is below the minimum required limit of ${options.minSize} bytes.`);
    });

    it('should fail for disallowed file extension', () => {
        const options: IFileValidationOptions = {
            disallowedExtensions: ['png', 'gif']
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`File extension is explicitly disallowed: .png.`);
    });

    it('should pass when the file has an allowed extension', () => {
        const options: IFileValidationOptions = {
            allowedExtensions: ['png', 'jpg']
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeTruthy();
    });

    it('should fail when the file name validation fails', () => {
        const options: IFileValidationOptions = {
            validateFileName: (name: string) => !name.includes('test')
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`File name validation failed for: ${mockFile.originalName}.`);
    });

    it('should fail when the file content validation fails', () => {
        const options: IFileValidationOptions = {
            validateFileContent: (buffer: Buffer) => buffer.toString('utf-8') !== 'Some file content here'
        };
        const result = validateFile(mockFile, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`File content validation failed.`);
    });
});
