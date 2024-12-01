import {status} from "../../../config";

export const postOrderPayload = <object>{
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
    },
    required: [
        'user_id',
        'address_id',
        'card_id',
        'status',
        'notes',
        'total',
        'discount',
    ],
    additionalProperties: false,
};
