export class UnauthorizedError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "Unauthorized";
        this.statusCode = 401;
        Error.captureStackTrace(this, UnauthorizedError);
    }
}