import {NextFunction, Request, Response} from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats"

const AJV_OPTS = {allErrors: true, verbose: true};

export const SchemaValidationMiddleware = {

    verify: (schema: Object) => {
        if (!schema) {
            throw new Error('Schema not provided');
        }

        return (req: Request, res: Response, next: NextFunction) => {
            const {body} = req;
            console.log(body);
            const ajv = new Ajv(AJV_OPTS);
            addFormats(ajv);
            const validate = ajv.compile(schema);
            const isValid = validate(body);

            if (isValid) {
                next();
                return;
            }

            const errorMessages = validate.errors.map(error => error.message);

            res.status(400).send({
                error: {
                    message: `Invalid Payload`,
                    details: errorMessages,
                }
            });
        }
    }
}
