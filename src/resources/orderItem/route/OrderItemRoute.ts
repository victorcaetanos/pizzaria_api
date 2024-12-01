import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {IOrderItemController, OrderItemController} from "../controller/OrderItemController";
import {IOrderItemService, OrderItemService} from "../service/OrderItemService";
import {IOrderItemRepository, OrderItemRepository} from "../model/OrderItemRepository";
import {patchOrderItemPayload, postOrderItemPayload} from "../schemas/";

export class OrderItemRoute {
    private router: Router;
    private orderItemController: IOrderItemController;
    private tokenService: ITokenService;
    private orderItemRepository: IOrderItemRepository;

    constructor() {
        this.orderItemRepository = new OrderItemRepository();
        const orderItemService: IOrderItemService = new OrderItemService(this.orderItemRepository);
        this.orderItemController = new OrderItemController(orderItemService);
        this.tokenService = TokenService.getInstance();
        this.router = Router();
        this.initializeRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initializeRoutes(): void {

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.orderItemController.getOrderItemById.bind(this.orderItemController),
        );

        this.router.get("/order/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.orderItemController.getOrderItemsByOrder.bind(this.orderItemController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postOrderItemPayload)
            ],
            this.orderItemController.createOrderItem.bind(this.orderItemController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchOrderItemPayload)
            ],
            this.orderItemController.updateOrderItem.bind(this.orderItemController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchOrderItemPayload)
            ],
            this.orderItemController.updateOrderItem.bind(this.orderItemController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.orderItemController.deleteOrderItem.bind(this.orderItemController),
        );
    }
}
