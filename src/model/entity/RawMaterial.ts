import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import {RawMaterialProduct} from "./RawMaterialProduct";

@Entity('raw_materials')
export class RawMaterial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => RawMaterialProduct, rawMaterialProduct => rawMaterialProduct.rawMaterial)
    rawMaterialProduct: RawMaterialProduct[];
}