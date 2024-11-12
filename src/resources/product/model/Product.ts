import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    UpdateDateColumn
} from 'typeorm';
import {OrderItem} from "../../orderItem/model/OrderItem";
import {SizeProduct} from "../../size/model/SizeProduct";
import {Category} from "../../category/model/Category";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    subcategory_id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => Category, category => category.product)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItem: OrderItem;

    @OneToMany(() => SizeProduct, sizeProduct => sizeProduct.product)
    sizeProduct: SizeProduct[];
}