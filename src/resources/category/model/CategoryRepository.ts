import {Category} from "./Category";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface ICategoryRepository {
    find(): Promise<Category[]>;

    findOneById(id: number): Promise<Category | null>;

    save(category: Category): Promise<Category>;

    update(category: Partial<Category>): Promise<Category>;

    delete(id: number): Promise<void>;
}

export class CategoryRepository implements ICategoryRepository {
    private readonly repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async find(): Promise<Category[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Category | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async save(category: Category): Promise<Category> {
        return this.repository.save(category);
    }

    async update(category: Partial<Category>): Promise<Category> {
        await this.repository.save(category);
        return await this.repository.findOne({
            where: {
                id: category.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}