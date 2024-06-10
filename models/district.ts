import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import Province from "./province";
import Sector from "./sector";

@Entity("districts")
export default class District {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, unique: true })
  name;

  @Column({ nullable: false, type: "varchar", default: "DISTRICT" })
  location_type;

  @Column({ nullable: false, unique: true })
  district_id!: number;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: "province_id", referencedColumnName: "province_id" })
  province!: Province;

  @OneToMany(() => Sector, (sector) => sector.district)
  sectors!: Sector[];

  constructor(name: string) {
    this.name = name;
    this.location_type = "DISTRICT";
  }
}
