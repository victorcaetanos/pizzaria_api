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
import {State} from '../../state/model/State';
import {Address} from "../../address/model/Address";

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'int'})
    state_id: number;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => State, state => state.city)
    @JoinColumn({name: 'state_id'})
    state: State;

    @OneToMany(() => Address, address => address.city)
    address: Address;
}