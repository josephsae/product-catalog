import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column("decimal")
  price?: number;

  @Column()
  description?: string;

  @Column()
  image?: string;

  @Column("decimal")
  rating?: number;
}
