import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Category } from './Category';
import {Product} from "./Product"; // Adjust the import path as necessary

@Entity('subcategories')
export class Subcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    category_id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @ManyToOne(() => Category, category => category.subcategory)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @OneToMany(() => Product, product => product.subcategory)
    product: Product;
}