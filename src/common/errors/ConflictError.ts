export class ConflictError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "Conflict";
        this.statusCode = 409;
        Error.captureStackTrace(this, ConflictError);
    }
}