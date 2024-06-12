import { Repository } from "typeorm";
import IRequest from "../enums/IRequest";
import IResponse from "../enums/IResponse";
import { AppDataSource } from "../data-source";
import Cell from "../models/cell";
import District from "../models/district";
import Province from "../models/province";
import Sector from "../models/sector";
import Village from "../models/village";
import { GetService } from "../services/GetService";

class GetController implements GetService {
  private provinceRepository: Repository<Province>;
  private districtRepository: Repository<District>;
  private sectorRepository: Repository<Sector>;
  private cellRepository: Repository<Cell>;
  private villageRepository: Repository<Village>;

  constructor(
    provinceRepo: Repository<Province>,
    districtRepo: Repository<District>,
    sectorRepo: Repository<Sector>,
    cellRepo: Repository<Cell>,
    villageRepo: Repository<Village>
  ) {
    this.provinceRepository = provinceRepo;
    this.districtRepository = districtRepo;
    this.sectorRepository = sectorRepo;
    this.cellRepository = cellRepo;
    this.villageRepository = villageRepo;
  }

  public async getProvinces(req: IRequest, res: IResponse) {
    try {
      const provinces = await this.provinceRepository.find();
      return res.json({ status: 201, provinces });
    } catch (err) {
      console.log(err);
    }
  }

  public async getDistricts(req: IRequest, res: IResponse) {
    try {
      const districts = await this.districtRepository.find();
      return res.json({ status: 201, districts });
    } catch (err) {
      console.log(err);
    }
  }

  public async getSectors(req: IRequest, res: IResponse) {
    try {
      const sectors = await this.sectorRepository.find();
      return res.json({ status: 201, sectors });
    } catch (err) {
      console.log(err);
    }
  }

  public async getCells(req: IRequest, res: IResponse) {
    try {
      const cells = await this.cellRepository.find();
      return res.json({ status: 201, cells });
    } catch (err) {
      console.log(err);
    }
  }

  public async getVillages(req: IRequest, res: IResponse) {
    try {
      const villages = await this.villageRepository.find();
      return res.json({ status: 201, villages });
    } catch (err) {
      console.log(err);
    }
  }
}

const getController = new GetController(
  AppDataSource.getRepository(Province),
  AppDataSource.getRepository(District),
  AppDataSource.getRepository(Sector),
  AppDataSource.getRepository(Cell),
  AppDataSource.getRepository(Village)
);


export const getProvinces = getController.getProvinces.bind(getController);
export const getDistricts = getController.getDistricts.bind(getController);
export const getSectors = getController.getSectors.bind(getController);
export const getCells = getController.getCells.bind(getController);
export const getVillages = getController.getVillages.bind(getController);