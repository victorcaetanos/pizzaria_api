import {City} from "./City";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface ICityRepository {
    find(): Promise<City[]>;

    findOneById(id: number): Promise<City | null>;

    findOneByStateId(state_id: number): Promise<City[] | null>;

    save(city: City): Promise<City>;

    update(city: Partial<City>): Promise<City>;

    delete(id: number): Promise<void>;
}

export class CityRepository implements ICityRepository {
    private readonly repository: Repository<City>;

    constructor() {
        this.repository = AppDataSource.getRepository(City);
    }

    async find(): Promise<City[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<City | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findOneByStateId(state_id: number): Promise<City[] | null> {
        return this.repository.find({
            where: {
                state_id: state_id,
            }
        });
    }

    async save(city: City): Promise<City> {
        return this.repository.save(city);
    }

    async update(city: Partial<City>): Promise<City> {
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