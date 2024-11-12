import express, {Express} from "express";
import {corsMiddleware, rateLimitMiddleware, loggerMiddleware, errorHandlerMiddleware} from "./common/middlewares/";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerDocument from "./swagger-output.json";
import {AppDataSource} from "./common/models";

import {UserRoute} from "./resources/user/route/UserRoute";
import {AuthorizationRoute} from "./resources/authorization/route/AuthorizationRoute";

const port: string = process.env.PORT;
const BASE_URL: string = "/api/v1";

const app: Express = express();
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(corsMiddleware); // enables CORS
app.use(loggerMiddleware) // Console logs all requests
app.use(errorHandlerMiddleware); // Console logs any errors and returns on json response
app.use(rateLimitMiddleware); // Limit the number of requests per IP to 100 per minute


// Routes
app.use(`${BASE_URL}/users`, new UserRoute().getRoutes());
app.use(BASE_URL, new AuthorizationRoute().getRoutes());

app.use(`${BASE_URL}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


AppDataSource.initialize()
    .then((): void => {
        app.listen(port, (): void => {
            console.log(`Server is running on port ${port}`);
            console.log(`API running on: http://localhost:${port}${BASE_URL}`);
            console.log(`API documentation: http://localhost:${port}${BASE_URL}/api-docs`);
        });
    })
    .catch((error: any): void => console.log(error));
