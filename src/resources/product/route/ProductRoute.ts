import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {IProductController, ProductController} from "../controller/ProductController";
import {IProductService, ProductService} from "../service/ProductService";
import {IProductRepository, ProductRepository} from "../model/ProductRepository";
import {patchProductPayload, postProductPayload} from "../schemas/";

export class ProductRoute {
    private router: Router;
    private productController: IProductController;
    private tokenService: ITokenService;
    private productRepository: IProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
        const productService: IProductService = new ProductService(this.productRepository);
        this.productController = new ProductController(productService);
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
            this.productController.getAllProducts.bind(this.productController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.productController.getProductById.bind(this.productController),
        );

        this.router.get("/category/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.productController.getProductByCategory.bind(this.productController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postProductPayload)
            ],
            this.productController.createProduct.bind(this.productController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchProductPayload)
            ],
            this.productController.updateProduct.bind(this.productController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchProductPayload)
            ],
            this.productController.updateProduct.bind(this.productController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.productController.deleteProduct.bind(this.productController),
        );
    }
}
