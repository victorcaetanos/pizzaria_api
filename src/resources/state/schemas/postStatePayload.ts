export const postStatePayload = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        abbreviation: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 2,
        },
    },
    required: [
        'name',
        'abbreviation',
    ],
    additionalProperties: false,
};
