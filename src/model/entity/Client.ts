import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import {Address} from "./Address";
import {Card} from "./Card";
import {Order} from "./Order";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    lastname: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone_number: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Address, address => address.client)
    address: Address;

    @OneToMany(() => Card, card => card.client)
    card: Card;

    @OneToMany(() => Order, order => order.client)
    order: Order;
}