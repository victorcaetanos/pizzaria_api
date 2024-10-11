import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client'; // Adjust the import path as necessary
import { City } from './City'; // Adjust the import path as necessary

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    client_id: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    cep: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    street: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    house_number: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    complement: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    neighborhood: string;

    @Column({ type: 'int', nullable: true })
    city_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Client, client => client.address)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => City, city => city.address)
    @JoinColumn({ name: 'city_id' })
    city: City;
}