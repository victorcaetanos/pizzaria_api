export const loginPayload = <object>{
    type: 'object',
    properties: {
        email: {
            type: 'string',
            nullable: false,
            format: 'email',
            maxLength: 100
        },
        password: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 255
        },
    },
    required: [
        'email',
        'password'
    ],
    additionalProperties: false,
};