import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  handle: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  sku: string;

  @Column('double')
  grams: number;

  @Column()
  stock: number;

  @Column('double')
  price: number;

  @Column({ nullable: true })
  compareprice: number;

  @Column({ nullable: true })
  barcode: string;
}
