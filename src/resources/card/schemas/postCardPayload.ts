export const postCardPayload = <object>{
    type: 'object',
    properties: {
        card_name: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 20,
        },
        card_number: {
            type: 'string',
            nullable: false,
            minLength: 16,
            maxLength: 19,
        },
        cpf: {
            type: 'string',
            nullable: true,
            minLength: 11,
            maxLength: 11,
        },
        expire_date: {
            type: 'date',
            nullable: false,
        },
        cvv: {
            type: 'string',
            nullable: false,
            minLength: 3,
            maxLength: 5,
        },
        user_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
    },
    required: [
        'card_name',
        'card_number',
        'cpf',
        'expire_date',
        'cvv',
        'user_id',
    ],
    additionalProperties: false,
};
