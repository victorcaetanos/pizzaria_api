// import {Repository} from "typeorm";
// import {AppDataSource, SizeProduct} from "../../../common/models";
//
// export interface ISizeProductRepository {
//     find(): Promise<SizeProduct[]>;
//
//     findOneById(id: number): Promise<SizeProduct | null>;
//
//     findByProductId(product_id: number): Promise<SizeProduct[] | null>;
//
//     save(product: SizeProduct): Promise<SizeProduct>;
//
//     update(product: Partial<SizeProduct>): Promise<SizeProduct>;
//
//     delete(id: number): Promise<void>;
// }
//
// export class SizeProductRepository implements ISizeProductRepository {
//     private readonly repository: Repository<SizeProduct>;
//
//     constructor() {
//         this.repository = AppDataSource.getRepository(SizeProduct);
//     }
//
//     async find(): Promise<SizeProduct[]> {
//         return this.repository.find();
//     }
//
//     async findOneById(id: number): Promise<SizeProduct | null> {
//         return this.repository.findOne({
//             where: {
//                 id: id,
//             }
//         });
//     }
//
//     async findByProductId(product_id: number): Promise<SizeProduct[] | null> {
//
//         return await this.repository
//             .createQueryBuilder("size")
//             .innerJoinAndSelect("rlt_size_product", "relation", "size.id = relation.size_id")
//             .where("relation.product_id = :product_id", {product_id})
//             .andWhere("relation.is_active = true")
//             .andWhere("size.is_active = true")
//             .getMany();
//     }
//
//     async save(product: SizeProduct): Promise<SizeProduct> {
//         return this.repository.save(product);
//     }
//
//     async update(product: Partial<SizeProduct>): Promise<SizeProduct> {
//         await this.repository.save(product);
//         return await this.repository.findOne({
//             where: {
//                 id: product.id,
//             }
//         });
//     }
//
//     async delete(id: number): Promise<void> {
//         await this.repository.delete(id);
//     }
// }