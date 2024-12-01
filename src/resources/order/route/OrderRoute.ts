import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {IOrderController, OrderController} from "../controller/OrderController";
import {IOrderService, OrderService} from "../service/OrderService";
import {IOrderRepository, OrderItemRepository} from "../model/OrderRepository";
import {patchOrderPayload, postOrderPayload} from "../schemas/";

export class OrderRoute {
    private router: Router;
    private orderItemController: IOrderController;
    private tokenService: ITokenService;
    private orderItemRepository: IOrderRepository;

    constructor() {
        this.orderItemRepository = new OrderItemRepository();
        const orderItemService: IOrderService = new OrderService(this.orderItemRepository);
        this.orderItemController = new OrderController(orderItemService);
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
            this.orderItemController.getOrderById.bind(this.orderItemController),
        );

        this.router.get("/user/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.orderItemController.getOrdersByUser.bind(this.orderItemController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postOrderPayload)
            ],
            this.orderItemController.createOrder.bind(this.orderItemController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchOrderPayload)
            ],
            this.orderItemController.updateOrder.bind(this.orderItemController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchOrderPayload)
            ],
            this.orderItemController.updateOrder.bind(this.orderItemController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.orderItemController.deleteOrder.bind(this.orderItemController),
        );
    }
}
