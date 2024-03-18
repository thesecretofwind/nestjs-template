import { ObjectId } from 'mongodb';
import { Column, Entity, ManyToMany, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flovar {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Coffee, (coffee) => coffee.flovars)
  coffees: Coffee[];
}
