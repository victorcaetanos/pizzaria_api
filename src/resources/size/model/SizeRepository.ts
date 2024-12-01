import {Repository} from "typeorm";
import {AppDataSource, Size} from "../../../common/models";

export interface ISizeRepository {
    find(): Promise<Size[]>;

    findOneById(id: number): Promise<Size | null>;

    findByProductId(product_id: number): Promise<Size[] | null>;

    save(product: Size): Promise<Size>;

    update(product: Partial<Size>): Promise<Size>;

    delete(id: number): Promise<void>;
}

export class SizeRepository implements ISizeRepository {
    private readonly repository: Repository<Size>;

    constructor() {
        this.repository = AppDataSource.getRepository(Size);
    }

    async find(): Promise<Size[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Size | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByProductId(product_id: number): Promise<Size[] | null> {

        return await this.repository
            .createQueryBuilder("size")
            .innerJoinAndSelect("rlt_size_product", "relation", "size.id = relation.size_id")
            .where("relation.product_id = :product_id", {product_id})
            .andWhere("relation.is_active = true")
            .andWhere("size.is_active = true")
            .getMany();
    }

    async save(product: Size): Promise<Size> {
        return this.repository.save(product);
    }

    async update(product: Partial<Size>): Promise<Size> {
        await this.repository.save(product);
        return await this.repository.findOne({
            where: {
                id: product.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}