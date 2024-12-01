export const patchUserPayload: object = <object>{
    type: 'object',
    properties: {
        email: {
            type: 'string',
            nullable: false,
            format: 'email',
            minLength: 6,
            maxLength: 100,
        },
        password: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 255,
        },
        phone_number: {
            type: 'string',
            nullable: false,
            pattern: '^[0-9]*$',
            minLength: 8,
            maxLength: 13,
        },
        first_name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        last_name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        }
    },
    additionalProperties: false,
};