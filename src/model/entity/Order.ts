import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Client } from './Client';
import {OrderItem} from "./OrderItem"; // Adjust the import path according to your project structure

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    client_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    discount: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Client, client => client.order)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItem: OrderItem;
}
