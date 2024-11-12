import cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

const corsOptions: object = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}

export const corsMiddleware = cors(corsOptions);