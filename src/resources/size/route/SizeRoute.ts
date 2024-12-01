import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {ISizeController, SizeController} from "../controller/SizeController";
import {ISizeService, SizeService} from "../service/SizeService";
import {ISizeRepository, SizeRepository} from "../model/SizeRepository";
import {patchSizePayload, postSizePayload} from "../schemas/";

export class SizeRoute {
    private router: Router;
    private sizeController: ISizeController;
    private tokenService: ITokenService;
    private sizeRepository: ISizeRepository;

    constructor() {
        this.sizeRepository = new SizeRepository();
        const sizeService: ISizeService = new SizeService(this.sizeRepository);
        this.sizeController = new SizeController(sizeService);
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
            this.sizeController.getAllSizes.bind(this.sizeController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.sizeController.getSizeById.bind(this.sizeController),
        );

        this.router.get("/product/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.sizeController.getSizesByProduct.bind(this.sizeController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postSizePayload)
            ],
            this.sizeController.createSize.bind(this.sizeController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchSizePayload)
            ],
            this.sizeController.updateSize.bind(this.sizeController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchSizePayload)
            ],
            this.sizeController.updateSize.bind(this.sizeController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.sizeController.deleteSize.bind(this.sizeController),
        );
    }
}
