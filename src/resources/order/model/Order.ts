import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/model/User';
import {OrderItem} from "../../orderItem/model/OrderItem";
import {Address} from "../../address/model/Address";
import {Card} from "../../card/model/Card";

export enum status {
    UNKNOWN = "unknown",
    ORDERED = "ordered",
    MAKING = "making",
    UNDERWAY = "underway",
    FINISHED = "finished",
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'int'})
    user_id: number;

    @Column({type: 'int'})
    card_id: number;

    @Column({type: 'int'})
    address_id: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    discount: number;

    @Column({type: 'varchar', length: 20})
    notes: string;

    @Column({type: 'enum', enum: status, default: status.ORDERED})
    status: status;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItem: OrderItem;

    @ManyToOne(() => Address, address => address.order)
    @JoinColumn({name: 'address_id'})
    address: Address;

    @ManyToOne(() => Card, card => card.order)
    @JoinColumn({name: 'card_id'})
    card: Card;
}
