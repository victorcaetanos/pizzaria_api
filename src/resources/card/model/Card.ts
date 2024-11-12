import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/model/User';

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    card_name: string;

    @Column({type: 'varchar', length: 20})
    cpf_cnpj: string;

    @Column({type: 'date'})
    expire_date: Date;

    @Column({type: 'varchar', length: 5})
    cvv: string;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @ManyToOne(() => User, user => user.card, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(() => User, user => user.selected_card)
    selected_card: User;
}