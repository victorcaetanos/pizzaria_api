import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Order} from '../../order/model/Order';
import {Product} from '../../product/model/Product';
import {Size} from "../../size/model/Size";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'int'})
    order_id: number;

    @Column({type: 'int'})
    product_id: number;

    @Column({type: 'int'})
    size_id: number;

    @Column({type: 'int'})
    quantity: number;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column('decimal', {precision: 10, scale: 2, default: 0})
    discount: number;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => Order, order => order.orderItem)
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToOne(() => Product, product => product.orderItem)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @ManyToOne(() => Size, size => size.orderItem)
    @JoinColumn({name: 'size_id'})
    size: Size;
}