export const patchAddressPayload: object = <object>{
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
        city_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}


