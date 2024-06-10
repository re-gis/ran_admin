import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Sector from "./sector";
import Village from "./village";

@Entity("cells")
export default class Cell {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  name;

  @Column({ nullable: false, type: "varchar", default: "CELL" })
  location_type;

  @Column({ nullable: false, unique: true })
  cell_id!: number;

  @ManyToOne(() => Sector, (sector) => sector.cells)
  @JoinColumn({ name: "sector_id", referencedColumnName: "sector_id" })
  sector!: Sector;

  @OneToMany(() => Village, (village) => village.cell)
  villages!: Village[];

  constructor(name: string) {
    this.name = name;
    this.location_type = "CELL";
  }
}
