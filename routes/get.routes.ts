import express from "express";
import {
  getCells,
  getDistricts,
  getProvinces,
  getSectors,
  getVillages,
} from "../serviceImpl/get.controller";
export const getRouters = express.Router();

getRouters.get("/provinces", getProvinces);
getRouters.get("/districts", getDistricts);
getRouters.get("/sectors", getSectors);
getRouters.get("/cells", getCells);
getRouters.get("/villages", getVillages);
