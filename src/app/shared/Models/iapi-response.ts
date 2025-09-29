import {IProduct} from './iproduct';

export interface IApiResponse {
  statusCode: number
  message: string
  data: IProduct[]
}
