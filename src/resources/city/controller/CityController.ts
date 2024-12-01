import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {ICityService} from "../service/CityService";
import {City} from "../model/City";

export interface ICityController {
    getAllCities(req: Request, res: Response): Promise<void>;

    getCityById(req: Request, res: Response): Promise<void>;

    getCitiesByState(req: Request, res: Response): Promise<void>;

    createCity(req: Request, res: Response): Promise<void>;

    updateCity(req: Request, res: Response): Promise<void>;

    deleteCity(req: Request, res: Response): Promise<void>;
}

export class CityController implements ICityController {
    private cityService: ICityService;

    constructor(cityService: ICityService) {
        this.cityService = cityService;
    }

    async getAllCities(req: Request, res: Response): Promise<void> {
        const cities: City[] = await this.cityService.findAll();
        if (cities.length > 0) {
            res.status(200).json({
                data: {
                    cities: cities
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Cities not found"
                },
            });
        }
    }

    async getCityById(req: Request, res: Response): Promise<void> {
        try {
            const city: City = await this.cityService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    city
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

    async getCitiesByState(req: Request, res: Response): Promise<void> {
        try {
            const cities: City[] = await this.cityService.findByStateId(Number(req.params.id));
            res.status(200).json({
                data: {
                    cities: cities
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

    async createCity(req: Request, res: Response): Promise<void> {
        try {
            const city: City = await this.cityService.create(req.body);
            res.status(200).json({
                data: {
                    city
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

    async updateCity(req: Request, res: Response): Promise<void> {
        try {
            const city: City = await this.cityService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    city
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

    async deleteCity(req: Request, res: Response): Promise<void> {
        try {
            await this.cityService.delete(Number(req.params.id));
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