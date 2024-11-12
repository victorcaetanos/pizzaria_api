import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from 'typeorm';
import {Product} from "../../product/model/Product";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @OneToMany(() => Product, product => product.category)
    product: Product;
}