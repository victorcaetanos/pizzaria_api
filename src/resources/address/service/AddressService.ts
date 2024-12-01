import {Address, City, User} from "../../../common/models";
import {IAddressRepository} from "../model/AddressRepository";
import {idValidation} from "../../../common/utils/validation";

export interface IAddressService {

    findOne(id: number): Promise<Address>;

    findByUserId(user_id: number): Promise<Address[]>;

    create(address: Address): Promise<Address>;

    update(id: number, address: Address): Promise<Address>;

    delete(id: number): Promise<void>;
}

export class AddressService implements IAddressService {
    private addressRepository: IAddressRepository;

    constructor(addressRepository: IAddressRepository) {
        this.addressRepository = addressRepository;
    }

    async findOne(id: number): Promise<Address> {
        try {
            await idValidation(id, Address);
            return await this.addressRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByUserId(user_id: number): Promise<Address[]> {
        try {
            await idValidation(user_id, User);
            return await this.addressRepository.findByUserId(user_id);
        } catch (err) {
            throw err;
        }
    }

    async create(address: Address): Promise<Address> {
        try {
            await idValidation(address.city_id, City);
            await idValidation(address.user_id, User);
            return await this.addressRepository.save(address);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, address: Address): Promise<Address> {

        try {
            await idValidation(address.city_id, City);
            await idValidation(address.user_id, User);
            await idValidation(id, Address);
            address.id = id;
            return await this.addressRepository.update(address);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Address);
            await this.addressRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}