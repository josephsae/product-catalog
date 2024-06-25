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

  @Column()
  color?: string;

  @Column()
  ram?: string;

  @Column("int")
  stock?: number;
}
