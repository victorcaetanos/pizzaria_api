import {State} from "../../../common/models";
import {IStateRepository} from "../model/StateRepository";
import {idValidation} from "../../../common/utils/validation";

export interface IStateService {

    findAll(): Promise<State[]>;

    findOne(id: number): Promise<State>;

    create(state: State): Promise<State>;

    update(id: number, state: State): Promise<State>;

    delete(id: number): Promise<void>;
}

export class StateService implements IStateService {
    private stateRepository: IStateRepository;

    constructor(stateRepository: IStateRepository) {
        this.stateRepository = stateRepository;
    }

    async findAll(): Promise<State[]> {
        return await this.stateRepository.find();
    }

    async findOne(id: number): Promise<State> {
        try {
            await idValidation(id, State);
            return await this.stateRepository.findOneById(id);
        } catch (err) {
            throw err;
        }
    }

    async create(state: State): Promise<State> {
        try {
            return await this.stateRepository.save(state);
        } catch (err: any) {
            throw err;
        }
    }

    async update(id: number, state: State): Promise<State> {

        try {
            await idValidation(id, State);
            state.id = id;
            return await this.stateRepository.update(state);
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, State);
            await this.stateRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }
}