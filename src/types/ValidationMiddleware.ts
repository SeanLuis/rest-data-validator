// Definir un tipo para el objeto de solicitud genérico
interface GenericRequest {
    [key: string]: any; // Index signature para cubrir propiedades específicas del framework
}

// Definir un tipo para el objeto de respuesta genérico
interface GenericResponse {
    [key: string]: any; // Index signature para cubrir propiedades específicas del framework
}

// Definir un tipo para la función de next/callback genérica
type NextFunction = (error?: any) => void;

// Definir el tipo para el middleware genérico
export type ValidationMiddleware = (req: GenericRequest, res: GenericResponse, next: NextFunction) => void;
