export const getAllUsersPayload: object = <object>{
    type: 'object',
    properties: {
        id: {
            type: 'number',
            nullable: false,
            exclusiveMinimum: 0,
            exclusiveMaximum: 2147483647,
        },
        email: {
            type: 'string',
            nullable: false,
            format: 'email',
            minLength: 6,
            maxLength: 100,
        }
    },
    required: [
        'id',
        'email',
    ],
    additionalProperties: false
};