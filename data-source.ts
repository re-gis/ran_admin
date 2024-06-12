// src/data-source.ts
import { DataSource } from "typeorm";
import Province from "./models/province";
import District from "./models/district";
import Sector from "./models/sector";
import Cell from "./models/cell";
import Village from "./models/village";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "194.163.167.131",
  port: 5432,
  username: "postgres",
  password: "@KPServer!4U",
  database: "rwanda_relational",
  synchronize: true,
  logging: true,
  entities: [Province, District, Sector, Cell, Village],
  migrations: ["migrations/**/*.js"],
});
