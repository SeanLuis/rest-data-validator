/**
 * The GenericRequest interface represents a generic request object.
 * It has an index signature to cover specific properties of the framework.
 * 
 * @interface
 * @property {[key: string]: any} - The index signature.
 */
interface GenericRequest {
    [key: string]: any;
}

/**
 * The GenericResponse interface represents a generic response object.
 * It has an index signature to cover specific properties of the framework.
 * 
 * @interface
 * @property {[key: string]: any} - The index signature.
 */
interface GenericResponse {
    [key: string]: any;
}

/**
 * The NextFunction type represents a generic next/callback function.
 * It takes an optional error object.
 * 
 * @type
 * @param {any} [error] - Optional. The error object.
 */
type NextFunction = (error?: any) => void;

/**
 * The ValidationMiddleware type represents a generic validation middleware function.
 * It takes a GenericRequest object, a GenericResponse object, and a NextFunction.
 * 
 * @type
 * @param {GenericRequest} req - The request object.
 * @param {GenericResponse} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export type ValidationMiddleware = (req: GenericRequest, res: GenericResponse, next: NextFunction) => void;