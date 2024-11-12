import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from 'typeorm';
import {SizeProduct} from "./SizeProduct";

@Entity('sizes')
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'boolean', default: true})
    is_active: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updated_at: Date;

    @OneToMany(() => SizeProduct, sizeProduct => sizeProduct.size)
    sizeProduct: SizeProduct[];
}