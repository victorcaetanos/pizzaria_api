import {Card} from "./Card";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface ICardRepository {
    find(): Promise<Card[]>;

    findOneById(id: number): Promise<Card | null>;

    findByUserId(user_id: number): Promise<Card[] | null>;

    save(city: Card): Promise<Card>;

    update(city: Partial<Card>): Promise<Card>;

    delete(id: number): Promise<void>;
}

export class CardRepository implements ICardRepository {
    private readonly repository: Repository<Card>;

    constructor() {
        this.repository = AppDataSource.getRepository(Card);
    }

    async find(): Promise<Card[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Card | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByUserId(user_id: number): Promise<Card[] | null> {
        return this.repository.find({
            where: {
                user_id: user_id,
            }
        });
    }

    async save(city: Card): Promise<Card> {
        return this.repository.save(city);
    }

    async update(city: Partial<Card>): Promise<Card> {
        await this.repository.save(city);
        return await this.repository.findOne({
            where: {
                id: city.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}