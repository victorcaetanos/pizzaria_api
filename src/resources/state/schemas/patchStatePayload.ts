export const patchStatePayload: object = <object>{
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
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}