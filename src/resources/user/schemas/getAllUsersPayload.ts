export const getAllUsersPayload: object = <object>{
    type: 'object',
    properties: {
        email: {
            type: 'string',
            nullable: false,
            format: 'email',
            minLength: 6,
            maxLength: 100,
        }
    },
    required: [
        'email',
    ],
    additionalProperties: false
};