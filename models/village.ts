import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Cell from "./cell";

@Entity("villages")
export default class Village {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  name;

  @Column({ nullable: false, type: "varchar", default: "VILLAGE" })
  location_type;

  @Column({ nullable: false, unique: true })
  village_id!: number;

  @ManyToOne(() => Cell, (cell) => cell.villages)
  @JoinColumn({ name: "cell_id", referencedColumnName: "cell_id" })
  cell!: Cell;

  constructor(name: string) {
    this.name = name;
    this.location_type = "VILLAGE";
  }
}
