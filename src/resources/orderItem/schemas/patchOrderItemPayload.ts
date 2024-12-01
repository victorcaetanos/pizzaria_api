export const patchOrderItemPayload: object = <object>{
    type: 'object',
    properties: {
        order_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        product_id: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            exclusiveMaximum: 2147483647,
        },
        quantity: {
            type: 'integer',
            nullable: false,
            minimum: 0,
        },
        price: {
            type: 'number',
            nullable: false,
            exclusiveMinimum: 0,
        },
        discount: {
            type: 'number',
            nullable: false,
            minimum: 0,
        },
        is_active: {
            type: 'boolean',
            nullable: false,
        }
    },
    additionalProperties: false,
}



