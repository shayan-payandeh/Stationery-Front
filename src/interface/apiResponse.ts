import { IData } from "./data";

export interface IApiResponse<T> {
  statusCode: number;
  data: IData<T>;
}
