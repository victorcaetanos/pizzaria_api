export const patchCategoryPayload: object = <object>{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 50,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}