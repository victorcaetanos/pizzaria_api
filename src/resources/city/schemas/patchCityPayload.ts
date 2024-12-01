export const patchCityPayload: object = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        state_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}