import {User} from "./User";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IUserRepository {
    find(): Promise<User[]>;

    findOneById(id: number): Promise<User | null>;

    findOneByPhone(phone_number: string): Promise<User | null>;

    findOneByEmail(email: string): Promise<User | null>;

    findOneByEmailWithPassword(email: string): Promise<User | null>;

    save(user: User): Promise<User>;

    update(user: Partial<User>): Promise<User>;

    delete(id: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async find(): Promise<User[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<User | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findOneByPhone(phone_number: string): Promise<User | null> {
        return this.repository.findOne({
            where: {
                phone_number: phone_number,
            }
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
            where: {
                email: email,
            }
        });
    }

    async findOneByEmailWithPassword(email: string): Promise<User | null> {
        return await this.repository
            .createQueryBuilder()
            .where("User.email = :email", {email: email})
            .addSelect("User.password")
            .getOne();

//ATT: this query works for getting JoinColumns into the select, without having to declare them as normal Column
//         return await this.repository
//             .createQueryBuilder("User")
//             .leftJoinAndSelect("User.selected_card", "selected_card") // Joins selected_card to ensure selected_card_id is retrieved
//             .where("User.email = :email", { email: "victor@email.com" })
//             .getOne();
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async update(user: Partial<User>): Promise<User> {
        await this.repository.save(user);
        return await this.repository.findOne({
            where: {
                id: user.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}