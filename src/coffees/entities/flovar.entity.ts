import { ObjectId } from 'mongodb';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  ObjectIdColumn,
} from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flovar {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  //   @ManyToMany(() => Coffee, (coffee) => coffee.flovars)
  //   coffees: Coffee[];
  constructor(id: ObjectId, name: string) {
    this._id = id;
    this.name = name;
  }
}
