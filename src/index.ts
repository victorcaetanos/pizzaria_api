import { AppDataSource } from "./model/data-source"
import "reflect-metadata"

AppDataSource.initialize().then(async () => {



}).catch(error => console.log(error))
