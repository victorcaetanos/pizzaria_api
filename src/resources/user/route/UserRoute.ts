import {Router} from "express";

import {IUserController, UserController} from "../controller/UserController";
import {
    SchemaValidationMiddleware,
    IsAuthenticatedMiddleware,
    CheckPermissionMiddleware
} from "../../../common/middlewares";
import {updateUserPayload, changeUserRolePayload} from "../schemas/";
import {roles} from "../../../config";
import {IUserService, UserService} from "../service/UserService";
import {CryptographyService, ICryptographyService} from "../../../common/services/CryptographyService";
import {ITokenService, TokenService} from "../../../common/services/TokenService";
import {IUserRepository, UserRepository} from "../model/UserRepository";
import {getAllUsersPayload} from "../schemas/getAllUsersPayload";

export class UserRoute {
    private router: Router;
    private userController: IUserController;
    private tokenService: ITokenService;
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        const cryptographyService: ICryptographyService = new CryptographyService();
        const userService: IUserService = new UserService(this.userRepository, cryptographyService);
        this.userController = new UserController(userService);
        this.tokenService = TokenService.getInstance();
        this.router = Router();
        this.initializeRoutes();
    }


    private initializeRoutes(): void {
        this.router.get("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                CheckPermissionMiddleware.has(this.userRepository, roles.ADMIN),
                SchemaValidationMiddleware.verify(getAllUsersPayload)
            ],
            this.userController.getAllUsers.bind(this.userController),
        );

        this.router.get("/jwt/:jwt",
            //TODO: figure this out later bc currently it messes with the mobile app
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.userController.getUserByJwt.bind(this.userController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.userController.getUserById.bind(this.userController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(updateUserPayload)
            ],
            this.userController.updateUser.bind(this.userController),
        );

        this.router.patch("/change-role/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                CheckPermissionMiddleware.has(this.userRepository, roles.ADMIN),
                SchemaValidationMiddleware.verify(changeUserRolePayload)
            ],
            this.userController.updateUser.bind(this.userController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.userController.deleteUser.bind(this.userController),
        );
    }

    public getRoutes(): Router {
        return this.router;
    }
}
