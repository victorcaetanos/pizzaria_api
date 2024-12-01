import {Category, Product} from "../../../common/models";
import {IProductRepository} from "../model/ProductRepository";
import {idValidation} from "../../../common/utils/validation";

export interface IProductService {

    findAll(): Promise<Product[]>;

    findOne(id: number): Promise<Product>;

    findByCategoryId(category_id: number): Promise<Product[]>;

    create(product: Product): Promise<Product>;

    update(id: number, product: Product): Promise<Product>;

    delete(id: number): Promise<void>;
}

export class ProductService implements IProductService {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        try {
            await idValidation(id, Product);
            return await this.productRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async findByCategoryId(category_id: number): Promise<Product[]> {
        try {
            await idValidation(category_id, Category);
            return await this.productRepository.findByCategoryId(category_id);
        } catch (err) {
            throw err;
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            await idValidation(product.category_id, Category);
            return await this.productRepository.save(product);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, product: Product): Promise<Product> {

        try {
            await idValidation(id, Product);
            await idValidation(product.category_id, Category);
            product.id = id;
            return await this.productRepository.update(product);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Product);
            await this.productRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}