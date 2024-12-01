import {Address} from "./Address";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IAddressRepository {
    find(): Promise<Address[]>;

    findOneById(id: number): Promise<Address | null>;

    findByUserId(user_id: number): Promise<Address[] | null>;

    save(address: Address): Promise<Address>;

    update(address: Partial<Address>): Promise<Address>;

    delete(id: number): Promise<void>;
}

export class AddressRepository implements IAddressRepository {
    private readonly repository: Repository<Address>;

    constructor() {
        this.repository = AppDataSource.getRepository(Address);
    }

    async find(): Promise<Address[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Address | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByUserId(user_id: number): Promise<Address[] | null> {
        return this.repository.find({
            where: {
                user_id: user_id,
            }
        });
    }

    async save(address: Address): Promise<Address> {
        return this.repository.save(address);
    }

    async update(user: Partial<Address>): Promise<Address> {
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