import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {AddressController, IAddressController} from "../controller/AddressController";
import {AddressService, IAddressService} from "../service/AddressService";
import {AddressRepository, IAddressRepository} from "../model/AddressRepository";
import {patchAddressPayload, postAddressPayload} from "../schemas/";

export class AddressRoute {
    private router: Router;
    private addressController: IAddressController;
    private tokenService: ITokenService;
    private addressRepository: IAddressRepository;

    constructor() {
        this.addressRepository = new AddressRepository();
        const addressService: IAddressService = new AddressService(this.addressRepository);
        this.addressController = new AddressController(addressService);
        this.tokenService = TokenService.getInstance();
        this.router = Router();
        this.initializeRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    private initializeRoutes(): void {

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.addressController.getAddressById.bind(this.addressController),
        );

        this.router.get("/user/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.addressController.getAddressesByUser.bind(this.addressController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postAddressPayload)
            ],
            this.addressController.createAddress.bind(this.addressController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchAddressPayload)
            ],
            this.addressController.updateAddress.bind(this.addressController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchAddressPayload)
            ],
            this.addressController.updateAddress.bind(this.addressController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.addressController.deleteAddress.bind(this.addressController),
        );
    }
}
