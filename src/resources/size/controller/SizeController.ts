import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {ISizeService} from "../service/SizeService";
import {Size} from "../model/Size";

export interface ISizeController {
    getAllSizes(req: Request, res: Response): Promise<void>;

    getSizeById(req: Request, res: Response): Promise<void>;

    getSizesByProduct(req: Request, res: Response): Promise<void>;

    createSize(req: Request, res: Response): Promise<void>;

    updateSize(req: Request, res: Response): Promise<void>;

    deleteSize(req: Request, res: Response): Promise<void>;
}

export class SizeController implements ISizeController {
    private sizeService: ISizeService;

    constructor(cityService: ISizeService) {
        this.sizeService = cityService;
    }

    async getAllSizes(req: Request, res: Response): Promise<void> {
        const sizes: Size[] = await this.sizeService.findAll();
        if (sizes.length > 0) {
            res.status(200).json({
                data: {
                    sizes: sizes
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Sizes not found"
                },
            });
        }
    }

    async getSizeById(req: Request, res: Response): Promise<void> {
        try {
            const size: Size = await this.sizeService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    size
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

    async getSizesByProduct(req: Request, res: Response): Promise<void> {
        try {
            const sizes: Size[] = await this.sizeService.findByProductId(Number(req.params.id));
            res.status(200).json({
                data: {
                    sizes: sizes
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

    async createSize(req: Request, res: Response): Promise<void> {
        try {
            const size: Size = await this.sizeService.create(req.body);
            res.status(200).json({
                data: {
                    size
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

    async updateSize(req: Request, res: Response): Promise<void> {
        try {
            const size: Size = await this.sizeService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    size
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

    async deleteSize(req: Request, res: Response): Promise<void> {
        try {
            await this.sizeService.delete(Number(req.params.id));
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