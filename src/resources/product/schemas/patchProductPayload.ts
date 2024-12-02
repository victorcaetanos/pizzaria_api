export const patchProductPayload: object = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        description: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 300,
        },
        image_url: {
            type: 'string',
            nullable: false,
            maxLength: 300,
        },
        category_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        price: {
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




