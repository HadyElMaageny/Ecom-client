import { IProduct } from './iproduct';

export interface CategoryResponse {
  statusCode: number;
  message: string;
  data: ICategory[];
}

export interface ICategory {
  name: string;
  description: string;
  products: IProduct[];
  id: number;
}
