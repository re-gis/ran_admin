import { Repository } from "typeorm";
import IRequest from "../enums/IRequest";
import IResponse from "../enums/IResponse";
import { AppDataSource } from "../data-source";
import Cell from "../models/cell";
import District from "../models/district";
import Province from "../models/province";
import Sector from "../models/sector";
import Village from "../models/village";

const provinceRepository: Repository<Province> =
  AppDataSource.getRepository(Province);
const districtRepository: Repository<District> =
  AppDataSource.getRepository(District);
const sectorRepository: Repository<Sector> =
  AppDataSource.getRepository(Sector);
const cellRepository: Repository<Cell> = AppDataSource.getRepository(Cell);
const villageRepository: Repository<Village> =
  AppDataSource.getRepository(Village);

export const getProvinces = async (req: IRequest, res: IResponse) => {
  try {
    const provinces = await provinceRepository.find();
    return res.json({ status: 201, provinces });
  } catch (err) {
    console.log(err);
  }
};

export const getDistricts = async (req: IRequest, res: IResponse) => {
  try {
    return res.json({
      status: 201,
      districts: await districtRepository.find(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSectors = async (req: IRequest, res: IResponse) => {
  try {
    return res.json({ status: 201, sectors: await sectorRepository.find() });
  } catch (err) {
    console.log(err);
  }
};

export const getCells = async (req: IRequest, res: IResponse) => {
  try {
    return res.json({ status: 201, cells: await cellRepository.find() });
  } catch (err) {
    console.log(err);
  }
};

export const getVillages = async (req: IRequest, res: IResponse) => {
  try {
    return res.json({ status: 201, villages: await villageRepository.find() });
  } catch (err) {
    console.log(err);
  }
};
