import {status} from "../../../config";

export const patchOrderPayload: object = <object>{
    type: 'object',
    properties: {
        user_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        address_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        card_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        status: {
            type: 'string',
            nullable: false,
            enum: Object.values(status),
        },
        notes: {
            type: 'string',
            nullable: false,
            minLength: 0,
            maxLength: 50,
        },
        total: {
            type: 'number',
            nullable: false,
            exclusiveMinimum: 0,
        },
        discount: {
            type: 'number',
            nullable: false,
            minimum: 0,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}


