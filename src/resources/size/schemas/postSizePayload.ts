export const postSizePayload = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
    },
    required: [
        'name',
    ],
    additionalProperties: false,
};
