import {OrderItem} from "./OrderItem";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IOrderItemRepository {
    find(): Promise<OrderItem[]>;

    findOneById(id: number): Promise<OrderItem | null>;

    findByOrderId(order_id: number): Promise<OrderItem[] | null>;

    save(orderItem: OrderItem): Promise<OrderItem>;

    update(orderItem: Partial<OrderItem>): Promise<OrderItem>;

    delete(id: number): Promise<void>;
}

export class OrderItemRepository implements IOrderItemRepository {
    private readonly repository: Repository<OrderItem>;

    constructor() {
        this.repository = AppDataSource.getRepository(OrderItem);
    }

    async find(): Promise<OrderItem[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<OrderItem | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByOrderId(order_id: number): Promise<OrderItem[] | null> {
        return this.repository.find({
            where: {
                order_id: order_id,
            }
        });
    }

    async save(orderItem: OrderItem): Promise<OrderItem> {
        return this.repository.save(orderItem);
    }

    async update(orderItem: Partial<OrderItem>): Promise<OrderItem> {
        await this.repository.save(orderItem);
        return await this.repository.findOne({
            where: {
                id: orderItem.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}