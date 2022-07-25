import {
    BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("cars")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  licensePlate: string;

  @Column()
  registration: string;

  @Column({ nullable: true })
  registrationState: string;

  @Column({ nullable: true })
  registrationExpiration: string;

  @Column({ nullable: true })
  registrationName: string;

  @Column({ update: false })
  vin: string;

  @Column({ nullable: true })
  carValue: number;

  @Column({ nullable: true })
  currentMileage: number;

  @Column({ nullable: true })
  description: number;

  @Column({ nullable: true })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}