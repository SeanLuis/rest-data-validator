export interface IDateValidationOptions  {
    format?: string; // Formato de fecha esperado (opcional, dependiendo de cómo quieras manejarlo)
    before?: Date; // La fecha debe ser anterior a esta
    after?: Date; // La fecha debe ser posterior a esta
}
