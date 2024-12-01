import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/model/User';
import {City} from '../../city/model/City';
import {Order} from "../../order/model/Order";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    user_id: number;

    @Column({type: 'int'})
    city_id: number;

    @Column({type: 'varchar', length: 20})
    cep: string;

    @Column({type: 'varchar', length: 100})
    street: string;

    @Column({type: 'varchar', length: 20, nullable: true})
    house_number: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    complement: string;

    @Column({type: 'varchar', length: 100})
    neighborhood: string;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => User, user => user.address, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => City, city => city.address)
    @JoinColumn({name: 'city_id'})
    city: City;

    @OneToMany(() => Order, order => order.address)
    order: Order;

    @OneToOne(() => User, user => user.selected_address)
    selected_address: User;
}