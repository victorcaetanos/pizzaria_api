import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IOrderItemService} from "../service/OrderItemService";
import {OrderItem} from "../model/OrderItem";

export interface IOrderItemController {

    getOrderItemById(req: Request, res: Response): Promise<void>;

    getOrderItemsByOrder(req: Request, res: Response): Promise<void>;

    createOrderItem(req: Request, res: Response): Promise<void>;

    updateOrderItem(req: Request, res: Response): Promise<void>;

    deleteOrderItem(req: Request, res: Response): Promise<void>;
}

export class OrderItemController implements IOrderItemController {
    private orderItemService: IOrderItemService;

    constructor(orderItemService: IOrderItemService) {
        this.orderItemService = orderItemService;
    }

    async getOrderItemById(req: Request, res: Response): Promise<void> {
        try {
            const orderItem: OrderItem = await this.orderItemService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    orderItem
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

    async getOrderItemsByOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderItems: OrderItem[] = await this.orderItemService.findByOrderId(Number(req.params.id));
            res.status(200).json({
                data: {
                    orderItems: orderItems
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

    async createOrderItem(req: Request, res: Response): Promise<void> {
        try {
            const orderItem: OrderItem = await this.orderItemService.create(req.body);
            res.status(200).json({
                data: {
                    orderItem
                },
            });
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

    async updateOrderItem(req: Request, res: Response): Promise<void> {
        try {
            const orderItem: OrderItem = await this.orderItemService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    orderItem
                },
            });
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

    async deleteOrderItem(req: Request, res: Response): Promise<void> {
        try {
            await this.orderItemService.delete(Number(req.params.id));
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