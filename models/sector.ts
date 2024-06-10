import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import District from "./district";
import Cell from "./cell";

@Entity("sectors")
export default class Sector {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  name;

  @Column({ nullable: false, type: "varchar", default: "SECTOR" })
  location_type;

  @Column({ nullable: false, unique: true })
  sector_id!: number;

  @ManyToOne(() => District, (district) => district.sectors)
  @JoinColumn({ name: "district_id", referencedColumnName: "district_id" })
  district!: District;

  @OneToMany(() => Cell, (cell) => cell.sector)
  cells!: Cell[];

  constructor(name: string) {
    this.name = name;
    this.location_type = "SECTOR";
  }
}
