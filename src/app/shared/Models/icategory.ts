export interface ICategory {
  id: number;
  name: string;
  description: string;
  products: any[];
}

export interface CategoriesResponse {
  statusCode: number;
  message: string;
  data: ICategory[];
}
