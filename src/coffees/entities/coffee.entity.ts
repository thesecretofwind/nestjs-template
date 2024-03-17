import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ObjectId, ObjectIdColumn } from "typeorm";
import { Flovar } from "./flovar.entity";

@Entity() // 对应coffee这张表
export class Coffee extends BaseEntity {
  @ObjectIdColumn() // 主键，自增长id
  _id: ObjectId;

  @Column()
  name: string;
  
  @Column()
  brand: string;

  // @Column({nullable: true}) // 这是定义列的，我们要改造成多表连接的形式，即连接Flovar表，里面每个元素都是Flovar表的id
  @ManyToMany(type => Flovar, flovar => flovar.coffees)
  @JoinTable()
  flovars: string[];
}
