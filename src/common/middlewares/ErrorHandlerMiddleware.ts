import {NextFunction, Request, Response} from "express";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    res.status(err.status || 500).json({message: err.message || "Internal Server Error"});
}