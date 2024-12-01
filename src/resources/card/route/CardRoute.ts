import {Router} from "express";

import {IsAuthenticatedMiddleware, SchemaValidationMiddleware} from "../../../common/middlewares";

import {ITokenService, TokenService} from "../../../common/services/TokenService";

import {CardController, ICardController} from "../controller/CardController";
import {CardService, ICardService} from "../service/CardService";
import {CardRepository, ICardRepository} from "../model/CardRepository";
import {patchCardPayload, postCardPayload} from "../schemas/";

export class CardRoute {
    private router: Router;
    private cardController: ICardController;
    private tokenService: ITokenService;
    private cardRepository: ICardRepository;

    constructor() {
        this.cardRepository = new CardRepository();
        const cardService: ICardService = new CardService(this.cardRepository);
        this.cardController = new CardController(cardService);
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
            this.cardController.getCardById.bind(this.cardController),
        );

        this.router.get("/user/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.cardController.getCardsByUser.bind(this.cardController),
        );

        this.router.post("/",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(postCardPayload)
            ],
            this.cardController.createCard.bind(this.cardController),
        );

        this.router.put("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCardPayload)
            ],
            this.cardController.updateCard.bind(this.cardController),
        );

        this.router.patch("/:id",
            [
                IsAuthenticatedMiddleware.check(this.tokenService),
                SchemaValidationMiddleware.verify(patchCardPayload)
            ],
            this.cardController.updateCard.bind(this.cardController),
        );

        this.router.delete("/:id",
            [IsAuthenticatedMiddleware.check(this.tokenService)],
            this.cardController.deleteCard.bind(this.cardController),
        );
    }
}
