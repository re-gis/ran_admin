import IRequest from "../enums/IRequest";
import IResponse from "../enums/IResponse";

export abstract class GetService {
  constructor() {}
  abstract getProvinces(req: IRequest, res: IResponse): Promise<IResponse | undefined>;

  abstract getDistricts(req: IRequest, res: IResponse): Promise<IResponse | undefined>;

  abstract getSectors(req: IRequest, res: IResponse): Promise<IResponse | undefined>;

  abstract getCells(req: IRequest, res: IResponse): Promise<IResponse | undefined>;

  abstract getVillages(req: IRequest, res: IResponse): Promise<IResponse | undefined>;
}
