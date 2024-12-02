export const postProductPayload = <object>{
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
            minLength: 2,
            maxLength: 300,
        },
        price: {
            type: 'number',
            nullable: false,
            minimum: 0,
        },
        category_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
    },
    required: [
        'name',
        'description',
        'image_url',
        'category_id',
    ],
    additionalProperties: false,
};
