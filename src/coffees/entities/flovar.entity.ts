import { Column, ManyToMany, ObjectId, ObjectIdColumn } from "typeorm";
import { Coffee } from "./coffee.entity";

export class Flovar {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @ManyToMany(type => Coffee, coffee => coffee.flovars)
  coffees: Coffee[]
}