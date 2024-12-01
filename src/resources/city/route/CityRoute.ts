import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {CityController, ICityController} from "../controller/CityController";
import {CityService, ICityService} from "../service/CityService";
import {CityRepository, ICityRepository} from "../model/CityRepository";
import {patchCityPayload, postCityPayload} from "../schemas/";

export class CityRoute {
    private router: Router;
    private cityController: ICityController;
    private tokenService: ITokenService;
    private cityRepository: ICityRepository;

    constructor() {
        this.cityRepository = new CityRepository();
        const cityService: ICityService = new CityService(this.cityRepository);
        this.cityController = new CityController(cityService);
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
            this.cityController.getAllCities.bind(this.cityController),
        );

        this.router.get("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.cityController.getCityById.bind(this.cityController),
        );

        this.router.get("/state/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.cityController.getCitiesByState.bind(this.cityController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postCityPayload)
            ],
            this.cityController.createCity.bind(this.cityController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCityPayload)
            ],
            this.cityController.updateCity.bind(this.cityController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCityPayload)
            ],
            this.cityController.updateCity.bind(this.cityController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.cityController.deleteCity.bind(this.cityController),
        );
    }
}
