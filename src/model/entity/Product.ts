import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Subcategory } from './Subcategory';
import {OrderItem} from "./OrderItem";
import {SizeProduct} from "./SizeProduct";
import {RawMaterialProduct} from "./RawMaterialProduct"; // Adjust the import path as necessary

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    subcategory_id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Subcategory, subcategory => subcategory.product)
    @JoinColumn({ name: 'subcategory_id' })
    subcategory: Subcategory;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItem: OrderItem;

    @OneToMany(() => SizeProduct, sizeProduct => sizeProduct.product)
    sizeProduct: SizeProduct[];

    @OneToMany(() => RawMaterialProduct, rawMaterialProduct => rawMaterialProduct.product)
    rawMaterialProduct: RawMaterialProduct[];
}