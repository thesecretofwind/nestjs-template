import { BaseEntity, Column, Entity, ManyToMany, ObjectId, ObjectIdColumn } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity()
export class Flovar extends BaseEntity {

  @ObjectIdColumn() // 主键，自增长id
  _id: ObjectId;

  @Column()
  name: string;

  @ManyToMany(type => Coffee, coffee => coffee.flovars)
  coffees: Coffee[]
}