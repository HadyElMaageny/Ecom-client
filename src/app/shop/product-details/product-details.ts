import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop-service';
import { IProduct } from '../../shared/Models/iproduct';
import { IApiResponse } from '../../shared/Models/iapi-response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  product: IProduct = {} as IProduct;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.shopService
      .getProductDetails(+this.activatedRoute.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (response: IApiResponse) => {
          this.product = response.data;
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }
}
