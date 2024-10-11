import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RawMaterial } from './RawMaterial'; // Adjust the import path as necessary
import { Product } from './Product'; // Adjust the import path as necessary

@Entity('rlt_raw_material_product')
export class RawMaterialProduct {
    @PrimaryColumn({ type: 'int' })
    raw_material_id: number;

    @PrimaryColumn({ type: 'int' })
    product_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => RawMaterial, rawMaterial => rawMaterial.rawMaterialProduct)
    @JoinColumn({ name: 'raw_material_id' })
    rawMaterial: RawMaterial;

    @ManyToOne(() => Product, product => product.rawMaterialProduct)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}