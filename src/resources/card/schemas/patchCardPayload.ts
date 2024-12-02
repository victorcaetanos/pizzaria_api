export const patchCardPayload: object = <object>{
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
            type: 'string',
            minLength: 10,
            maxLength: 10,
            nullable: false,
        },
        cvv: {
            type: 'string',
            nullable: false,
            minLength: 3,
            maxLength: 5,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}




