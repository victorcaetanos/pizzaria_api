import {Router} from "express";

import {AuthorizationController, IAuthorizationController} from "../controller/AuthorizationController";
import {SchemaValidationMiddleware} from "../../../common/middlewares";
import {loginPayload, registerPayload} from "../schemas";
import {AuthorizationService, IAuthorizationService} from "../service/AuthorizationService";
import {IUserService, UserService} from "../../user/service/UserService";
import {CryptographyService, ICryptographyService} from "../../../common/services/CryptographyService";
import {ITokenService, TokenService} from "../../../common/services/TokenService";
import {IUserRepository, UserRepository} from "../../user/model/UserRepository";


export class AuthorizationRoute {
    private router: Router;
    private authorizationController: IAuthorizationController;

    constructor() {
        const userRepository: IUserRepository = new UserRepository();
        const cryptographyService: ICryptographyService = new CryptographyService();
        const webTokenService: ITokenService = TokenService.getInstance();

        const userService: IUserService = new UserService(
            userRepository, cryptographyService
        );

        const authorizationService: IAuthorizationService = new AuthorizationService(
            userService, cryptographyService, webTokenService, userRepository
        );

        this.authorizationController = new AuthorizationController(authorizationService);
        this.router = Router();
        this.initializeRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.post(
            "/signup",
            [SchemaValidationMiddleware.verify(registerPayload)],
            this.authorizationController.register.bind(this.authorizationController)
        );

        this.router.post(
            "/login",
            [SchemaValidationMiddleware.verify(loginPayload)],
            this.authorizationController.login.bind(this.authorizationController)
        );
    }
}
