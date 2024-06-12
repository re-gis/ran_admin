import IRequest from "../enums/IRequest";
import IResponse from "../enums/IResponse";
import {
  provinces,
  sectors,
  districts,
  cells,
  villages,
  //@ts-ignore
} from "rwanda-relational";
import Province from "../models/province";
import { Repository, getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import District from "../models/district";
import Sector from "../models/sector";
import Cell from "../models/cell";
import Village from "../models/village";

class SeedController {
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
  seedProvinces = async (req: IRequest, res: IResponse) => {
    try {
      const ps = provinces();
      console.log(ps);
      for (let pro of ps) {
        //   await provinceRepository.create({
        //     province_id: ps[i].province_id,
        //     name: ps[i].name,
        //     location_type: "PROVINCE",
        //   });

        //   const p = new Province(ps[i].name, ps[i].id);
        //   console.log(ps.length)
        await this.provinceRepository.save({
          location_type: pro.location_type,
          name: pro.name,
          province_id: pro.id,
        });
      }
      return res.json({
        message: "Provinces seeded successfully...",
        status: 201,
      });
    } catch (e) {
      console.log(e);
    }
  };

  seedDistricts = async (req: IRequest, res: IResponse) => {
    try {
      const ds = districts();
      for (let d of ds) {
        // console.log(d);
        const p = await this.provinceRepository.findOne({
          where: [{ province_id: d.parent_id }],
        });

        if (!p) {
          return res.json({
            status: 404,
            message: "Province " + d.parent_id + " not found!",
          });
        } else {
          await this.districtRepository.save({
            district_id: d.id,
            location_type: "DISTRICT",
            name: d.name,
            province: d.parent_id,
          });
        }
      }
      return res.json({
        message: "Districts seeded successfully...",
        status: 201,
      });
    } catch (err) {
      console.log(err);
    }
  };

  seedSectors = async (req: IRequest, res: IResponse) => {
    try {
      const ss = sectors();
      for (let s of ss) {
        const d = await this.districtRepository.findOne({
          where: [{ district_id: s.parent_id }],
        });
        if (!d) {
          return res.json({
            status: 404,
            message: "District " + s.parent_id + " not found!",
          });
        } else {
          await this.sectorRepository.save({
            district: s.parent_id,
            location_type: "SECTOR",
            name: s.name,
            sector_id: s.id,
          });
        }
      }

      return res.json({
        status: 201,
        message: "Sectors seeded successfully...",
      });
    } catch (err) {
      console.log(err);
    }
  };

  seedCells = async (req: IRequest, res: IResponse) => {
    try {
      const cs = cells();
      for (let c of cs) {
        const s = await this.sectorRepository.findOne({
          where: [{ sector_id: c.parent_id }],
        });
        if (!s) {
          return res.json({
            status: 404,
            message: "Sector " + c.parent_id + " not found!",
          });
        } else {
          await this.cellRepository.save({
            cell_id: c.id,
            name: c.name,
            location_type: "CELL",
            sector: c.parent_id,
          });
        }
      }
      return res.json({ status: 201, message: "Cells seeded successfully..." });
    } catch (err) {
      console.log(err);
    }
  };

  seedVillages = async (req: IRequest, res: IResponse) => {
    try {
      const vs = villages();
      for (let v of vs) {
        const c = await this.cellRepository.findOne({
          where: [{ cell_id: v.parent_id }],
        });
        if (!c) {
          return res.json({
            status: 404,
            message: "Cell " + v.parent_id + " not found!",
          });
        } else {
          await this.villageRepository.save({
            cell: v.parent_id,
            name: v.name,
            location_type: "VILLAGE",
            village_id: v.id,
          });
        }
      }
      return res.json({
        status: 201,
        message: "Villages seeded successfully...",
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const seedController = new SeedController(
  AppDataSource.getRepository(Province),
  AppDataSource.getRepository(District),
  AppDataSource.getRepository(Sector),
  AppDataSource.getRepository(Cell),
  AppDataSource.getRepository(Village)
);

export const seedProvinces = seedController.seedProvinces.bind(seedController);
export const seedDistricts = seedController.seedDistricts.bind(seedController);
export const seedSectors = seedController.seedSectors.bind(seedController);
export const seedCells = seedController.seedCells.bind(seedController);
export const seedVillages = seedController.seedVillages.bind(seedController);
