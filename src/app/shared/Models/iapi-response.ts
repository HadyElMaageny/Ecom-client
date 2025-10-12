import { IProduct } from './iproduct';

export interface IApiResponse {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: IProduct[];
}
