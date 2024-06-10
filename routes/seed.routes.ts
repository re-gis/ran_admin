import express from "express";
import {
  seedCells,
  seedDistricts,
  seedProvinces,
  seedSectors,
  seedVillages,
} from "../controllers/seed.controller";
export const seedRouters = express.Router();

seedRouters.post("/provinces", seedProvinces);
seedRouters.post("/districts", seedDistricts);
seedRouters.post("/sectors", seedSectors);
seedRouters.post("/cells", seedCells);
seedRouters.post("/villages", seedVillages);
