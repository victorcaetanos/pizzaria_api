import {Address, Card, Order, Size, User} from "../../../common/models";
import {IOrderRepository} from "../model/OrderRepository";
import {idValidation} from "../../../common/utils/validation";

export interface IOrderService {
    findOne(id: number): Promise<Order>;

    findByUserId(user_id: number): Promise<Order[]>;

    create(order: Order): Promise<Order>;

    update(id: number, order: Order): Promise<Order>;

    delete(id: number): Promise<void>;
}

export class OrderService implements IOrderService {
    private orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async findOne(id: number): Promise<Order> {
        try {
            await idValidation(id, Order);
            return await this.orderRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByUserId(user_id: number): Promise<Order[]> {
        try {
            await idValidation(user_id, User);
            return await this.orderRepository.findByUserId(user_id);
        } catch (err) {
            throw err;
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            await idValidation(order.card_id, Card);
            await idValidation(order.address_id, Address);
            await idValidation(order.user_id, Size);
            return await this.orderRepository.save(order);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, order: Order): Promise<Order> {

        try {
            await idValidation(order.card_id, Card);
            await idValidation(order.address_id, Address);
            await idValidation(order.user_id, Size);
            await idValidation(id, Order);
            order.id = id;
            return await this.orderRepository.update(order);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Order);
            await this.orderRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}