import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {ICardService} from "../service/CardService";
import {Card} from "../model/Card";

export interface ICardController {

    getCardById(req: Request, res: Response): Promise<void>;

    getCardsByUser(req: Request, res: Response): Promise<void>;

    createCard(req: Request, res: Response): Promise<void>;

    updateCard(req: Request, res: Response): Promise<void>;

    deleteCard(req: Request, res: Response): Promise<void>;
}

export class CardController implements ICardController {
    private cardService: ICardService;

    constructor(cardService: ICardService) {
        this.cardService = cardService;
    }

    async getCardById(req: Request, res: Response): Promise<void> {
        try {
            const card: Card = await this.cardService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    card
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

    async getCardsByUser(req: Request, res: Response): Promise<void> {
        try {
            const cards: Card[] = await this.cardService.findByUserId(Number(req.params.id));
            res.status(200).json({
                data: {
                    cards: cards
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

    async createCard(req: Request, res: Response): Promise<void> {
        try {
            const card: Card = await this.cardService.create(req.body);
            res.status(200).json({
                data: {
                    card
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

    async updateCard(req: Request, res: Response): Promise<void> {
        try {
            const card: Card = await this.cardService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    card
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

    async deleteCard(req: Request, res: Response): Promise<void> {
        try {
            await this.cardService.delete(Number(req.params.id));
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