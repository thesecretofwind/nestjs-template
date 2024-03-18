import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flovar } from "./flovar.entity";

@Entity()
export class Coffee {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  brand: string;

  @Column({default: 0})
  recommendations: number;

  @ManyToMany(() => Flovar, flovar => flovar.coffees, {cascade: true})
  @JoinTable()
  flovars: Flovar[];
}

