import {Product} from "./Product";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IProductRepository {
    find(): Promise<Product[]>;

    findOneById(id: number): Promise<Product | null>;

    findByCategoryId(category_id: number): Promise<Product[] | null>;

    save(product: Product): Promise<Product>;

    update(product: Partial<Product>): Promise<Product>;

    delete(id: number): Promise<void>;
}

export class ProductRepository implements IProductRepository {
    private readonly repository: Repository<Product>;

    constructor() {
        this.repository = AppDataSource.getRepository(Product);
    }

    async find(): Promise<Product[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Product | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByCategoryId(category_id: number): Promise<Product[] | null> {
        return this.repository.find({
            where: {
                category_id: category_id,
            }
        });
    }

    async save(product: Product): Promise<Product> {
        return this.repository.save(product);
    }

    async update(product: Partial<Product>): Promise<Product> {
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