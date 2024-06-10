import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import District from "./district";

@Entity("provinces")
export default class Province {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, unique: true })
  name;

  @Column({ nullable: false, type: "varchar", default: "PROVINCE" })
  location_type;

  @Column({ nullable: false, unique: true })
  province_id: number;

  @OneToMany(() => District, (district) => district.province)
  districts!: District[];

  constructor(name: string, province_id: number) {
    this.name = name;
    this.location_type = "PROVINCE";
    this.province_id = province_id;
  }
}
