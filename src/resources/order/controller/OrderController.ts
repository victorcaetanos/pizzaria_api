import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IOrderService} from "../service/OrderService";
import {Order} from "../model/Order";

export interface IOrderController {

    getOrderById(req: Request, res: Response): Promise<void>;

    getOrdersByUser(req: Request, res: Response): Promise<void>;

    createOrder(req: Request, res: Response): Promise<void>;

    updateOrder(req: Request, res: Response): Promise<void>;

    deleteOrder(req: Request, res: Response): Promise<void>;
}

export class OrderController implements IOrderController {
    private orderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.orderService = orderService;
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const order: Order = await this.orderService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    order
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

    async getOrdersByUser(req: Request, res: Response): Promise<void> {
        try {
            const orders: Order[] = await this.orderService.findByUserId(Number(req.params.id));
            res.status(200).json({
                data: {
                    orders: orders
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

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const order: Order = await this.orderService.create(req.body);
            res.status(200).json({
                data: {
                    order
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

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const order: Order = await this.orderService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    order
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

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            await this.orderService.delete(Number(req.params.id));
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