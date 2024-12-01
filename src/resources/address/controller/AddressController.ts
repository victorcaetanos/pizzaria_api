import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IAddressService} from "../service/AddressService";
import {Address} from "../model/Address";

export interface IAddressController {

    getAddressById(req: Request, res: Response): Promise<void>;

    getAddressesByUser(req: Request, res: Response): Promise<void>;

    createAddress(req: Request, res: Response): Promise<void>;

    updateAddress(req: Request, res: Response): Promise<void>;

    deleteAddress(req: Request, res: Response): Promise<void>;
}

export class AddressController implements IAddressController {
    private addressService: IAddressService;

    constructor(cityService: IAddressService) {
        this.addressService = cityService;
    }

    async getAddressById(req: Request, res: Response): Promise<void> {
        try {
            const address: Address = await this.addressService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    address
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

    async getAddressesByUser(req: Request, res: Response): Promise<void> {
        try {
            const addresses: Address[] = await this.addressService.findByUserId(Number(req.params.id));
            res.status(200).json({
                data: {
                    addresses: addresses
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

    async createAddress(req: Request, res: Response): Promise<void> {
        try {
            const address: Address = await this.addressService.create(req.body);
            res.status(200).json({
                data: {
                    address
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

    async updateAddress(req: Request, res: Response): Promise<void> {
        try {
            const address: Address = await this.addressService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    address
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

    async deleteAddress(req: Request, res: Response): Promise<void> {
        try {
            await this.addressService.delete(Number(req.params.id));
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