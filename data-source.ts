// src/data-source.ts
import { DataSource } from "typeorm";
import Province from "./models/province";
import District from "./models/district";
import Sector from "./models/sector";
import Cell from "./models/cell";
import Village from "./models/village";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "Password@2001",
  database: "rwanda_relational",
  synchronize: true,
  logging: true,
  entities: [Province, District, Sector, Cell, Village],
  migrations: ["migrations/**/*.js"],
});
