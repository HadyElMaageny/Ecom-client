import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApiResponse } from '../shared/Models/iapi-response';
import { CategoryResponse } from '../shared/Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProducts(categoryId?: number, sortOption?: string, search?: string) {
    let params = new HttpParams();
    if (categoryId) {
      params = params.append('CategoryId', categoryId);
    }
    if (sortOption) {
      params = params.append('Sort', sortOption);
    }
    if (search) {
      params = params.append('Search', search);
    }
    return this.http.get<IApiResponse>(this.baseUrl + '/api/Products', { params });
  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl + '/api/Categories');
  }
}
