import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Country } from './Country';
import {City} from "./City"; // Adjust the import path according to your project structure

@Entity('states')
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 2 })
    abbreviation: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Country, country => country.state)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @OneToMany(() => City, city => city.state)
    city: City;
}