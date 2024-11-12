export class ForbiddenError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "Forbidden";
        this.statusCode = 403;
        Error.captureStackTrace(this, ForbiddenError);
    }
}