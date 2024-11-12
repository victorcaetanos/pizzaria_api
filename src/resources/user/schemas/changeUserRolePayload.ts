import {roles} from '../../../config';

export const changeUserRolePayload: object = <object>{
    type: 'object',
    properties: {
        role: {
            type: 'string',
            nullable: false,
            enum: Object.values(roles),
        }
    },
    required: [
        'role',
    ],
    additionalProperties: false
};