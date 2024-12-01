export const postAddressPayload = <object>{
    type: 'object',
    properties: {
        cep: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 20,
        },
        street: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        house_number: {
            type: 'string',
            nullable: true,
            maxLength: 20,
        },
        complement: {
            type: 'string',
            nullable: true,
            maxLength: 50,
        },
        neighborhood: {
            type: 'string',
            nullable: false,
            maxLength: 100,
        },
        user_id: {
            type: 'number',
            nullable: false,
            minimum: 1,
        },
        city_id: {
            type: 'number',
            nullable: false,
            minimum: 1,
        },
    },
    required: [
        'cep',
        'street',
        'neighborhood',
        'user_id',
        'city_id',
    ],
    additionalProperties: false,
};
