export const postCategoryPayload = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 50,
        },
    },
    required: [
        'name',
    ],
    additionalProperties: false,
};
