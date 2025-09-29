import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiResponse} from '../shared/Models/iapi-response';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "http://localhost:5000";

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<IApiResponse>(this.baseUrl + "/api/Products");
  }
}
