import {EntityTarget, ObjectLiteral, Repository} from "typeorm";
import {NotFoundError, UnprocessableEntityError} from "../errors";
import {AppDataSource} from "../models";

export function validateId(id: any): boolean {

    if (id == undefined || isNaN(id))
        return false;

    try {
        id = parseInt(id);
        if (id % 1 !== 0)
            return false;
    } catch (err) {
        return false;
    }

    if (id < 1 || id > 2147483646)
        return false;

    return true;
}

export async function idValidation(id: number, object: EntityTarget<ObjectLiteral>): Promise<void> {
    if (validateId(id) === false) {
        // @ts-ignore
        throw new UnprocessableEntityError(`Invalid ${object.name} id`);
    }

    let repository: Repository<ObjectLiteral> = AppDataSource.getRepository(object);

    const existingEntity: ObjectLiteral = await repository.findOne({
        where: {
            id: id,
        }
    });

    if (!existingEntity) {
        // @ts-ignore
        throw new NotFoundError(`Could not find any ${object.name} with id: \`${id}\`.`);
    }
}