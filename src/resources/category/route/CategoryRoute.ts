import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {CategoryController, ICategoryController} from "../controller/CategoryController";
import {CategoryService, ICategoryService} from "../service/CategoryService";
import {CategoryRepository, ICategoryRepository} from "../model/CategoryRepository";
import {patchCategoryPayload, postCategoryPayload} from "../schemas/";

export class CategoryRoute {
    private router: Router;
    private categoryController: ICategoryController;
    private tokenService: ITokenService;
    private categoryRepository: ICategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        const categoryService: ICategoryService = new CategoryService(this.categoryRepository);
        this.categoryController = new CategoryController(categoryService);
        this.tokenService = TokenService.getInstance();
        this.router = Router();
        this.initializeRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initializeRoutes(): void {

        this.router.get("/",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.categoryController.getAllCategories.bind(this.categoryController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.categoryController.getCategoryById.bind(this.categoryController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postCategoryPayload)
            ],
            this.categoryController.createCategory.bind(this.categoryController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCategoryPayload)
            ],
            this.categoryController.updateCategory.bind(this.categoryController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCategoryPayload)
            ],
            this.categoryController.updateCategory.bind(this.categoryController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.categoryController.deleteCategory.bind(this.categoryController),
        );
    }
}
