export class UnprocessableEntityError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "Unprocessable Entity";
        this.statusCode = 422;
        Error.captureStackTrace(this, UnprocessableEntityError);
    }
}