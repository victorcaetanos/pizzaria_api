import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {IStateController, StateController} from "../controller/StateController";
import {IStateService, StateService} from "../service/StateService";
import {IStateRepository, StateRepository} from "../model/StateRepository";
import {patchStatePayload, postStatePayload} from "../schemas/";

export class StateRoute {
    private router: Router;
    private stateController: IStateController;
    private tokenService: ITokenService;
    private stateRepository: IStateRepository;

    constructor() {
        this.stateRepository = new StateRepository();
        const stateService: IStateService = new StateService(this.stateRepository);
        this.stateController = new StateController(stateService);
        this.tokenService = TokenService.getInstance();
        this.router = Router();
        this.initializeRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.get("/",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.stateController.getAllStates.bind(this.stateController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.stateController.getStateById.bind(this.stateController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postStatePayload)
            ],
            this.stateController.createState.bind(this.stateController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchStatePayload)
            ],
            this.stateController.updateState.bind(this.stateController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchStatePayload)
            ],
            this.stateController.updateState.bind(this.stateController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.stateController.deleteState.bind(this.stateController),
        );
    }
}
