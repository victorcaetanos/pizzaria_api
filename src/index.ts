import express, {Express} from "express";
import {corsMiddleware, errorHandlerMiddleware, loggerMiddleware, rateLimitMiddleware} from "./common/middlewares/";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerDocument from "./swagger-output.json";
import {AppDataSource} from "./common/models";

import {UserRoute} from "./resources/user/route/UserRoute";
import {AuthorizationRoute} from "./resources/authorization/route/AuthorizationRoute";
import {CategoryRoute} from "./resources/category/route/CategoryRoute";
import {AddressRoute} from "./resources/address/route/AddressRoute";
import {CardRoute} from "./resources/card/route/CardRoute";
import {CityRoute} from "./resources/city/route/CityRoute";
import {OrderRoute} from "./resources/order/route/OrderRoute";
import {OrderItemRoute} from "./resources/orderItem/route/OrderItemRoute";
import {ProductRoute} from "./resources/product/route/ProductRoute";
import {SizeRoute} from "./resources/size/route/SizeRoute";
import {StateRoute} from "./resources/state/route/StateRoute";

const port: string = process.env.PORT;
const BASE_URL: string = "/api/v1";

const app: Express = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(loggerMiddleware)
app.use(errorHandlerMiddleware);
app.use(rateLimitMiddleware);


// Routes
app.use(`${BASE_URL}/users`, new UserRoute().getRoutes());
app.use(`${BASE_URL}/addresses`, new AddressRoute().getRoutes());
app.use(`${BASE_URL}/cards`, new CardRoute().getRoutes());
app.use(`${BASE_URL}/categories`, new CategoryRoute().getRoutes());
app.use(`${BASE_URL}/cities`, new CityRoute().getRoutes());
app.use(`${BASE_URL}/orders`, new OrderRoute().getRoutes());
app.use(`${BASE_URL}/order-items`, new OrderItemRoute().getRoutes());
app.use(`${BASE_URL}/products`, new ProductRoute().getRoutes());
app.use(`${BASE_URL}/sizes`, new SizeRoute().getRoutes());
app.use(`${BASE_URL}/states`, new StateRoute().getRoutes());
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
