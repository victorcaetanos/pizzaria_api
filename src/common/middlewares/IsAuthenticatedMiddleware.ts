import {NextFunction, Request, Response} from "express";
import {ITokenService} from "../services/TokenService";
import * as dotenv from "dotenv";

dotenv.config();

export const IsAuthenticatedMiddleware = {
    check: (tokenService: ITokenService) => {
        return (req, res: Response, next: NextFunction) => {

            const authHeader = req.headers['authorization'];

            if (!authHeader || !authHeader.startsWith('Bearer')) {
                res.status(401).json({
                    error: {
                        message: !authHeader ? 'Auth headers not provided in the request.' : 'Invalid auth mechanism.'
                    }
                });
                return;
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                res.status(401).json({
                    error: {
                        message: 'Bearer token missing in the authorization headers.'
                    }
                });
                return;
            }

            try {
                req.user = tokenService.verify(token, process.env.JWT_SECRET);
                next();
            } catch (err) {
                console.log(err)
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({
                        error: {
                            message: 'Token has expired. Please login again.'
                        }
                    });
                    return;
                } else if (err.name === 'InvalidTokenError') {
                    res.status(403).json({
                        error: {
                            message: 'Invalid token. Please login again.'
                        }
                    });
                    return;
                }
                res.status(403).json({
                    error: {
                        message: 'Invalid token. Please login again.'
                    }
                });
            }
        };
    },
};