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
import {User} from '../../user/model/User';
import {OrderItem} from "../../orderItem/model/OrderItem";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'int'})
    client_id: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    discount: number;

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
}
