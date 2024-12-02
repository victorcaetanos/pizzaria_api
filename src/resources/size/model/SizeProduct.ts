import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {Product} from '../../product/model/Product';
import {Size} from './Size';

@Entity('rlt_size_product')
export class SizeProduct {

    @PrimaryColumn({type: 'int'})
    product_id: number;

    @PrimaryColumn({type: 'int'})
    size_id: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    size_price: number;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => Product, product => product.sizeProduct)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @ManyToOne(() => Size, size => size.sizeProduct)
    @JoinColumn({name: 'size_id'})
    size: Size;
}