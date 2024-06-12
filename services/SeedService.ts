import IRequest from "../enums/IRequest";
import IResponse from "../enums/IResponse";

export abstract class GetService {
  constructor() {}
  abstract seedProvinces(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse | undefined>;

  abstract seedDistricts(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse | undefined>;

  abstract seedSectors(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse | undefined>;

  abstract seedCells(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse | undefined>;

  abstract seedVillages(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse | undefined>;
}
