import {Order} from "./Order";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IOrderRepository {
    find(): Promise<Order[]>;

    findOneById(id: number): Promise<Order | null>;

    findByUserId(user_id: number): Promise<Order[] | null>;

    save(order: Order): Promise<Order>;

    update(order: Partial<Order>): Promise<Order>;

    delete(id: number): Promise<void>;
}

export class OrderItemRepository implements IOrderRepository {
    private readonly repository: Repository<Order>;

    constructor() {
        this.repository = AppDataSource.getRepository(Order);
    }

    async find(): Promise<Order[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Order | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByUserId(user_id: number): Promise<Order[] | null> {
        return this.repository.find({
            where: {
                user_id: user_id,
            }
        });
    }

    async save(order: Order): Promise<Order> {
        return this.repository.save(order);
    }

    async update(order: Partial<Order>): Promise<Order> {
        await this.repository.save(order);
        return await this.repository.findOne({
            where: {
                id: order.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}