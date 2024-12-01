import {ICityRepository} from "../model/CityRepository";
import {idValidation} from "../../../common/utils/validation";
import {City, State} from "../../../common/models/";

export interface ICityService {

    findAll(): Promise<City[]>;

    findOne(id: number): Promise<City>;

    findByStateId(state_id: number): Promise<City[]>;

    create(city: City): Promise<City>;

    update(id: number, city: City): Promise<City>;

    delete(id: number): Promise<void>;
}

export class CityService implements ICityService {
    private cityRepository: ICityRepository;

    constructor(cityRepository: ICityRepository) {
        this.cityRepository = cityRepository;
    }

    async findAll(): Promise<City[]> {
        return await this.cityRepository.find();
    }

    async findOne(id: number): Promise<City> {
        try {
            await idValidation(id, City);
            return await this.cityRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByStateId(state_id: number): Promise<City[]> {
        try {
            await idValidation(state_id, State);
            return await this.cityRepository.findOneByStateId(state_id);
        } catch (err) {
            throw err;
        }
    }

    async create(city: City): Promise<City> {
        try {
            await idValidation(city.state_id, State);
            return await this.cityRepository.save(city);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, city: City): Promise<City> {

        try {
            await idValidation(city.state_id, State);
            await idValidation(id, City);
            city.id = id;
            return await this.cityRepository.update(city);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, City);
            await this.cityRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}