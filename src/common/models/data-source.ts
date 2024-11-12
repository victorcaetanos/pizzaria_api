import "reflect-metadata";
import * as dotenv from 'dotenv';
import {DataSource} from "typeorm";
import {
    User, State, City, Address,
    Category, Product, SizeProduct,
    Order, OrderItem, Card, Size,
} from "./index";

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        User, State, City, Address,
        Category, Product, SizeProduct,
        Order, OrderItem, Card, Size,
    ],
    migrations: [],
    subscribers: [],
})
