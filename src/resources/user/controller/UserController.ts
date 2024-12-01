import {Request, Response} from "express";
import {ConflictError, NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IUserService} from "../service/UserService";
import {User} from "../model/User";

export interface IUserController {
    getAllUsers(req: Request, res: Response): Promise<void>;

    getUserById(req: Request, res: Response): Promise<void>;

    getUserByJwt(req: Request, res: Response): Promise<void>;

    updateUser(req: Request, res: Response): Promise<void>;

    deleteUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users: User[] = await this.userService.findAll();
        if (users.length > 0) {
            res.status(200).json({
                data: {
                    users
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Users not found"
                },
            });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user: User = await this.userService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    user
                },
            });
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof UnprocessableEntityError) {
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

    async getUserByJwt(req: Request, res: Response): Promise<void> {
        try {
            const user: User = await this.userService.findOneByJwt(req.params.jwt);
            res.status(200).json({
                data: {
                    user
                },
            });
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof UnprocessableEntityError) {
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


    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user: User = await this.userService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    user
                },
            });
        } catch (err) {
            if (err instanceof UnprocessableEntityError || err instanceof NotFoundError || err instanceof ConflictError) {
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

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await this.userService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (err) {
            if (err instanceof UnprocessableEntityError || err instanceof NotFoundError) {
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