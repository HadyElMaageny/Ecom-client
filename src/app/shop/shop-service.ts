import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApiResponse } from '../shared/Models/iapi-response';
import { CategoryResponse } from '../shared/Models/icategory';
import { ProductParams } from '../shared/Models/ProductParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProducts(productParams: ProductParams) {
    let params = new HttpParams();
    if (productParams.categoryId) {
      params = params.append('CategoryId', productParams.categoryId);
    }
    if (productParams.sort) {
      params = params.append('Sort', productParams.sort);
    }
    if (productParams.search) {
      params = params.append('Search', productParams.search);
    }
    params = params.append('PageNumber', productParams.pageNumber);
    params = params.append('PageSize', productParams.pageSize);

    return this.http.get<IApiResponse>(this.baseUrl + '/api/Products', { params });
  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl + '/api/Categories');
  }

  getProductDetails(id: number) {
    return this.http.get<IApiResponse>(this.baseUrl + '/api/Products/' + id);
  }
}
