import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {ICategoryService} from "../service/CategoryService";
import {Category} from "../model/Category";

export interface ICategoryController {
    getAllCategories(req: Request, res: Response): Promise<void>;

    getCategoryById(req: Request, res: Response): Promise<void>;

    createCategory(req: Request, res: Response): Promise<void>;

    updateCategory(req: Request, res: Response): Promise<void>;

    deleteCategory(req: Request, res: Response): Promise<void>;
}

export class CategoryController implements ICategoryController {
    private categoryService: ICategoryService;

    constructor(categoryService: ICategoryService) {
        this.categoryService = categoryService;
    }

    async getAllCategories(req: Request, res: Response): Promise<void> {
        const categories: Category[] = await this.categoryService.findAll();
        if (categories.length > 0) {
            res.status(200).json({
                data: {
                    categories: categories
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Categories not found"
                },
            });
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const category: Category = await this.categoryService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    category
                },
            });
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof UnprocessableEntityError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const category: Category = await this.categoryService.create(req.body);
            res.status(200).json({
                data: {
                    category
                },
            });
        } catch (err) {
            if (err instanceof UnprocessableEntityError || err instanceof NotFoundError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const category: Category = await this.categoryService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    category
                },
            });
        } catch (err) {
            if (err instanceof UnprocessableEntityError || err instanceof NotFoundError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            await this.categoryService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (err) {
            if (err instanceof UnprocessableEntityError || err instanceof NotFoundError) {
                res.status(err.statusCode).json({
                    error: {
                        message: err.message
                    },
                });
            } else {
                throw err;
            }
        }
    }
}