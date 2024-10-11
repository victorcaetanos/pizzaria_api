import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order'; // Adjust the import path as necessary
import { Product } from './Product'; // Adjust the import path as necessary

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    order_id: number;

    @Column({ type: 'int' })
    product_id: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    discount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Order, order => order.orderItem)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderItem)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}