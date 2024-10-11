import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { State } from './State';
import {Address} from "./Address"; // Assuming you have a State entity defined in State.ts

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'int' })
    state_id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => State, state => state.city)
    @JoinColumn({ name: 'state_id'})
    state: State;

    @OneToMany(() => Address, address => address.city)
    address: Address;
}