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

const provinceRepository: Repository<Province> =
  AppDataSource.getRepository(Province);
const districtRepository: Repository<District> =
  AppDataSource.getRepository(District);
const sectorRepository: Repository<Sector> =
  AppDataSource.getRepository(Sector);
const cellRepository: Repository<Cell> = AppDataSource.getRepository(Cell);
const villageRepository: Repository<Village> =
  AppDataSource.getRepository(Village);

export const seedProvinces = async (req: IRequest, res: IResponse) => {
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
      await provinceRepository.save({
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

export const seedDistricts = async (req: IRequest, res: IResponse) => {
  try {
    const ds = districts();
    for (let d of ds) {
      // console.log(d);
      const p = await provinceRepository.findOne({
        where: [{ province_id: d.parent_id }],
      });

      if (!p) {
        return res.json({
          status: 404,
          message: "Province " + d.parent_id + " not found!",
        });
      } else {
        await districtRepository.save({
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

export const seedSectors = async (req: IRequest, res: IResponse) => {
  try {
    const ss = sectors();
    for (let s of ss) {
      const d = await districtRepository.findOne({
        where: [{ district_id: s.parent_id }],
      });
      if (!d) {
        return res.json({
          status: 404,
          message: "District " + s.parent_id + " not found!",
        });
      } else {
        await sectorRepository.save({
          district: s.parent_id,
          location_type: "SECTOR",
          name: s.name,
          sector_id: s.id,
        });
      }
    }

    return res.json({ status: 201, message: "Sectors seeded successfully..." });
  } catch (err) {
    console.log(err);
  }
};

export const seedCells = async (req: IRequest, res: IResponse) => {
  try {
    const cs = cells();
    for (let c of cs) {
      const s = await sectorRepository.findOne({
        where: [{ sector_id: c.parent_id }],
      });
      if (!s) {
        return res.json({
          status: 404,
          message: "Sector " + c.parent_id + " not found!",
        });
      } else {
        await cellRepository.save({
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

export const seedVillages = async (req: IRequest, res: IResponse) => {
  try {
    const vs = villages();
    for (let v of vs) {
      const c = await cellRepository.findOne({
        where: [{ cell_id: v.parent_id }],
      });
      if (!c) {
        return res.json({
          status: 404,
          message: "Cell " + v.parent_id + " not found!",
        });
      } else {
        await villageRepository.save({
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
