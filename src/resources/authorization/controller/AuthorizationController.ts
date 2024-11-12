import {Request, Response} from "express";
import {ConflictError, NotFoundError, UnauthorizedError} from "../../../common/errors";
import {IAuthorizationService} from "../service/AuthorizationService";
import {authResponseType} from "../schemas";

export interface IAuthorizationController {
    register(req: Request, res: Response): Promise<void>;

    login(req: Request, res: Response): Promise<void>;
}

export class AuthorizationController implements IAuthorizationController {
    private authorizationService: IAuthorizationService;

    constructor(authorizationService: IAuthorizationService) {
        this.authorizationService = authorizationService;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const data: authResponseType = await this.authorizationService.create(req.body);
            res.status(201).json(
                data
            );
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof ConflictError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {

        try {
            const data: authResponseType = await this.authorizationService.findOne(req.body);
            res.status(200).json(
                data
            );
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof UnauthorizedError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }
}


