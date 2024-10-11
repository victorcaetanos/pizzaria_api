import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import {SizeProduct} from "./SizeProduct";

@Entity('sizes')
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => SizeProduct, sizeProduct => sizeProduct.size)
    sizeProduct: SizeProduct[];
}