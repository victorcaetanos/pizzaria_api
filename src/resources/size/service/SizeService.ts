import {Product, Size} from "../../../common/models/";
import {ISizeRepository} from "../model/SizeRepository";
import {idValidation} from "../../../common/utils/validation";

export interface ISizeService {

    findAll(): Promise<Size[]>;

    findOne(id: number): Promise<Size>;

    findByProductId(id: number): Promise<Size[]>;

    create(size: Size): Promise<Size>;

    update(id: number, state: Size): Promise<Size>;

    delete(id: number): Promise<void>;
}

export class SizeService implements ISizeService {
    private sizeRepository: ISizeRepository;

    constructor(sizeRepository: ISizeRepository) {
        this.sizeRepository = sizeRepository;
    }

    async findAll(): Promise<Size[]> {
        return await this.sizeRepository.find();
    }

    async findOne(id: number): Promise<Size> {
        try {
            await idValidation(id, Size);
            return await this.sizeRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByProductId(product_id: number): Promise<Size[]> {
        try {
            await idValidation(product_id, Product);
            return await this.sizeRepository.findByProductId(product_id);
        } catch (err) {
            throw err;
        }
    }

    async create(size: Size): Promise<Size> {
        try {
            return await this.sizeRepository.save(size);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, size: Size): Promise<Size> {

        try {
            await idValidation(id, Size);
            size.id = id;
            return await this.sizeRepository.update(size);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Size);
            await this.sizeRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}