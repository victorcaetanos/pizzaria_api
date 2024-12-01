import {Card, User} from "../../../common/models";
import {ICardRepository} from "../model/CardRepository";
import {idValidation} from "../../../common/utils/validation";

export interface ICardService {
    findOne(id: number): Promise<Card>;

    findByUserId(user_id: number): Promise<Card[]>;

    create(card: Card): Promise<Card>;

    update(id: number, card: Card): Promise<Card>;

    delete(id: number): Promise<void>;
}

export class CardService implements ICardService {
    private cardRepository: ICardRepository;

    constructor(cardRepository: ICardRepository) {
        this.cardRepository = cardRepository;
    }

    async findOne(id: number): Promise<Card> {
        try {
            await idValidation(id, Card);
            return await this.cardRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByUserId(user_id: number): Promise<Card[]> {
        try {
            await idValidation(user_id, User);
            return await this.cardRepository.findByUserId(user_id);
        } catch (err) {
            throw err;
        }
    }

    async create(card: Card): Promise<Card> {
        try {
            await idValidation(card.user_id, User);
            return await this.cardRepository.save(card);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, card: Card): Promise<Card> {

        try {
            await idValidation(id, Card);
            await idValidation(card.user_id, User);
            card.id = id;
            return await this.cardRepository.update(card);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Card);
            await this.cardRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}