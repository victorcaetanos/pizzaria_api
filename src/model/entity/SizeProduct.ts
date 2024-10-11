import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product'; // Adjust the import path as necessary
import { Size } from './Size'; // Adjust the import path as necessary

@Entity('rlt_size_product')
export class SizeProduct {

    @PrimaryColumn({ type: 'int' })
    product_id: number;

    @PrimaryColumn({ type: 'int' })
    size_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Product, product => product.sizeProduct)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Size, size => size.sizeProduct)
    @JoinColumn({ name: 'size_id' })
    size: Size;
}