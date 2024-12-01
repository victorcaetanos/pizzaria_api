import {Category} from "../../../common/models";
import {ICategoryRepository} from "../model/CategoryRepository";
import {idValidation} from "../../../common/utils/validation";

export interface ICategoryService {

    findAll(): Promise<Category[]>;

    findOne(id: number): Promise<Category>;

    create(category: Category): Promise<Category>;

    update(id: number, category: Category): Promise<Category>;

    delete(id: number): Promise<void>;
}

export class CategoryService implements ICategoryService {
    private categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        try {
            await idValidation(id, Category);
            return await this.categoryRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async create(category: Category): Promise<Category> {
        try {
            return await this.categoryRepository.save(category);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, category: Category): Promise<Category> {

        try {
            await idValidation(id, Category);
            category.id = id;
            return await this.categoryRepository.update(category);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, Category);
            await this.categoryRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}