import {State} from "./State";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../common/models";

export interface IStateRepository {
    find(): Promise<State[]>;

    findOneById(id: number): Promise<State | null>;

    save(state: State): Promise<State>;

    update(state: Partial<State>): Promise<State>;

    delete(id: number): Promise<void>;
}

export class StateRepository implements IStateRepository {
    private readonly repository: Repository<State>;

    constructor() {
        this.repository = AppDataSource.getRepository(State);
    }

    async find(): Promise<State[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<State | null> {
        return this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async save(state: State): Promise<State> {
        return this.repository.save(state);
    }

    async update(state: Partial<State>): Promise<State> {
        await this.repository.save(state);
        return await this.repository.findOne({
            where: {
                id: state.id,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}