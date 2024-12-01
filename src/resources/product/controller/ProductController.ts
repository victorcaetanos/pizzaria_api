import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IProductService} from "../service/ProductService";
import {Product} from "../model/Product";

export interface IProductController {
    getAllProducts(req: Request, res: Response): Promise<void>;

    getProductById(req: Request, res: Response): Promise<void>;

    getProductByCategory(req: Request, res: Response): Promise<void>;

    createProduct(req: Request, res: Response): Promise<void>;

    updateProduct(req: Request, res: Response): Promise<void>;

    deleteProduct(req: Request, res: Response): Promise<void>;
}

export class ProductController implements IProductController {
    private productService: IProductService;

    constructor(productService: IProductService) {
        this.productService = productService;
    }

    async getAllProducts(req: Request, res: Response): Promise<void> {
        const products: Product[] = await this.productService.findAll();
        if (products.length > 0) {
            res.status(200).json({
                data: {
                    products: products
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Products not found"
                },
            });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const product: Product = await this.productService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    product
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

    async getProductByCategory(req: Request, res: Response): Promise<void> {
        const products: Product[] = await this.productService.findByCategoryId(Number(req.params.id));
        if (products.length > 0) {
            res.status(200).json({
                data: {
                    products: products
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Products not found"
                },
            });
        }
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product: Product = await this.productService.create(req.body);
            res.status(200).json({
                data: {
                    product
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

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const product: Product = await this.productService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    product
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

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            await this.productService.delete(Number(req.params.id));
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