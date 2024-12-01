import {Order, OrderItem, Product, Size} from "../../../common/models";
import {IOrderItemRepository} from "../model/OrderItemRepository";
import {idValidation} from "../../../common/utils/validation";

export interface IOrderItemService {

    findOne(id: number): Promise<OrderItem>;

    findByOrderId(order_id: number): Promise<OrderItem[]>;

    create(orderItem: OrderItem): Promise<OrderItem>;

    update(id: number, orderItem: OrderItem): Promise<OrderItem>;

    delete(id: number): Promise<void>;
}

export class OrderItemService implements IOrderItemService {
    private orderItemRepository: IOrderItemRepository;

    constructor(orderItemRepository: IOrderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    async findOne(id: number): Promise<OrderItem> {
        try {
            await idValidation(id, OrderItem);
            return await this.orderItemRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByOrderId(order_id: number): Promise<OrderItem[]> {
        try {
            await idValidation(order_id, Order);
            return await this.orderItemRepository.findByOrderId(order_id);
        } catch (err) {
            throw err;
        }
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
        try {
            await idValidation(orderItem.order_id, Order);
            await idValidation(orderItem.product_id, Product);
            await idValidation(orderItem.size_id, Size);
            return await this.orderItemRepository.save(orderItem);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, orderItem: OrderItem): Promise<OrderItem> {

        try {
            await idValidation(orderItem.order_id, Order);
            await idValidation(orderItem.product_id, Product);
            await idValidation(orderItem.size_id, Size);
            await idValidation(id, OrderItem);
            orderItem.id = id;
            return await this.orderItemRepository.update(orderItem);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, OrderItem);
            await this.orderItemRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}