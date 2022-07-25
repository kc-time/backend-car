import {
  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Car } from "../car/car";

@Entity("car_models")
export class CarModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  make: string;

  @OneToMany(() => Car, (car) => car.model)
      cars: Car[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
