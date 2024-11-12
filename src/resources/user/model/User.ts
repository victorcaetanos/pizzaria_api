import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    UpdateDateColumn
} from 'typeorm';
import {Address} from "../../address/repository/Address";
import {Card} from "../../card/model/Card";
import {Order} from "../../order/model/Order";

export enum role {
    ADMIN = "admin",
    USER = "user",
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255, select: false})
    password: string;

    @Column({type: 'varchar', length: 100})
    first_name: string;

    @Column({type: 'varchar', length: 100})
    last_name: string;

    @Column({type: 'varchar', length: 15})
    phone_number: string;

    // @Column({type: 'enum', length: 15}) TODO: check this declaration
    @Column({type: "enum", enum: role, default: role.USER})
    role: role

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @OneToMany(() => Address, address => address.user)
    address: Address;

    @OneToMany(() => Card, card => card.user)
    card: Card;

    @OneToMany(() => Order, order => order.user)
    order: Order;

    @OneToOne(() => Card, card => card.user, {nullable: true})
    @JoinColumn({name: 'selected_card_id'})
    selected_card: Card;

    @OneToOne(() => Address, address => address.user, {nullable: true})
    @JoinColumn({name: 'selected_address_id'})
    selected_address: Address;
}