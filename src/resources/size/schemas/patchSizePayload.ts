export const patchSizePayload: object = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}