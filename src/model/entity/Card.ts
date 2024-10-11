import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client'; // Adjust the import path according to your project structure

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    client_id: number;

    @Column({ type: 'varchar', length: 100 })
    card_name: string;

    @Column({ type: 'varchar', length: 20 })
    cpf_cnpj: string;

    @Column({ type: 'date' })
    expire_date: Date;

    @Column({ type: 'varchar', length: 5 })
    cvv: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Client, client => client.card)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}