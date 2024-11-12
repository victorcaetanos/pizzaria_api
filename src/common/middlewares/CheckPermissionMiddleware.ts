import {NextFunction, Request, Response} from "express";
import {User} from "../models";
import {roles} from "../../config";
import {IUserRepository} from "../../resources/user/model/UserRepository";
import {validateId} from "../utils/validation";


export const CheckPermissionMiddleware = {
    has: (userRepository: IUserRepository, role: string) => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            if (validateId(req.params.id) === false) {
                res.status(422).json({
                    error: {
                        message: `Invalid user id`
                    }
                });
                return;
            }
            const id: number = parseInt(req.params.id);

            const databaseUser: User = await userRepository.findOneById(id);

            if (!databaseUser) {
                res.status(403).json({
                    error: {
                        message: "Invalid credentials, please enter the correct id and email."
                    }
                });
                return;
            }

            const loginType: string = databaseUser.role;
            if (loginType !== role) {
                res.status(403).json({
                    error: {
                        message: `You need to be ${role === roles.ADMIN ? "an" : "a"} ${role} to access this endpoint.`
                    }
                });
                return;
            }

            next();
        };
    },
};