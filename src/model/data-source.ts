import "reflect-metadata";
import { DataSource} from "typeorm";
import {User} from "./entity/User"
import {Client} from "./entity/Client";
import {Country} from "./entity/Country";
import {City} from "./entity/City";
import {Address} from "./entity/Address";
import {State} from "./entity/State";
import {Category} from "./entity/Category";
import {Subcategory} from "./entity/Subcategory";
import {Product} from "./entity/Product";
import {Order} from "./entity/Order";
import {Card} from "./entity/Card";
import {OrderItem} from "./entity/OrderItem";
import {Size} from "./entity/Size";
import {SizeProduct} from "./entity/SizeProduct";
import {RawMaterial} from "./entity/RawMaterial";
import {RawMaterialProduct} from "./entity/RawMaterialProduct";
import 'dotenv/config'
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Client, Country, State, City, Address,
        Card, Order, Category, Subcategory, Product, OrderItem,
        Size, SizeProduct, RawMaterial, RawMaterialProduct
    ],
    migrations: [],
    subscribers: [],
})
