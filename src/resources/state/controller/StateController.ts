import {Request, Response} from "express";
import {NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {IStateService} from "../service/StateService";
import {State} from "../model/State";

export interface IStateController {
    getAllStates(req: Request, res: Response): Promise<void>;

    getStateById(req: Request, res: Response): Promise<void>;

    createState(req: Request, res: Response): Promise<void>;

    updateState(req: Request, res: Response): Promise<void>;

    deleteState(req: Request, res: Response): Promise<void>;
}

export class StateController implements IStateController {
    private stateService: IStateService;

    constructor(stateService: IStateService) {
        this.stateService = stateService;
    }

    async getAllStates(req: Request, res: Response): Promise<void> {
        const states: State[] = await this.stateService.findAll();
        if (states.length > 0) {
            res.status(200).json({
                data: {
                    states: states
                },
            });
        } else {
            res.status(404).json({
                error: {
                    message: "States not found"
                },
            });
        }
    }

    async getStateById(req: Request, res: Response): Promise<void> {
        try {
            const state: State = await this.stateService.findOne(Number(req.params.id));
            res.status(200).json({
                data: {
                    state
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

    async createState(req: Request, res: Response): Promise<void> {
        try {
            const state: State = await this.stateService.create(req.body);
            res.status(200).json({
                data: {
                    state
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

    async updateState(req: Request, res: Response): Promise<void> {
        try {
            const state: State = await this.stateService.update(Number(req.params.id), req.body);
            res.status(200).json({
                data: {
                    state
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

    async deleteState(req: Request, res: Response): Promise<void> {
        try {
            await this.stateService.delete(Number(req.params.id));
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