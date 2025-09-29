import {Component, OnInit} from '@angular/core';
import {IProduct} from '../shared/Models/iproduct';
import {ShopService} from './shop-service';
import {IApiResponse} from '../shared/Models/iapi-response';
import {ICategory} from '../shared/Models/icategory';

interface Sort {
  name: string;
  code: string;
}

@Component({
  selector: 'app-shop-component',
  standalone: false,
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.scss'
})
export class ShopComponent implements OnInit {
  sortingOptions: Sort[] = [];
  selectedSortOption: Sort | undefined;
  products: IProduct[] = [];
  categories!: ICategory[];
  selectedCategory!: ICategory;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.sortingOptions = [
      {name: 'Name', code: 'name'},
      {name: 'PriceAsc', code: 'priceAsc'},
      {name: 'PriceDesc', code: 'priceDesc'},
    ];
    this.categories = [
      {id: 1, name: 'Electronics', description: 'Latest gadgets and electronic devices', products: []},
      {id: 2, name: 'Clothing', description: 'Fashion apparel for men, women and children', products: []},
      {id: 3, name: 'Home & Garden', description: 'Furniture and outdoor living essentials', products: []}
    ];
    // this.selectedSortOption = this.sortingOptions[0];
    // this.shopService.getProducts()
    //   .subscribe({
    //     next: (response: IApiResponse) => {
    //       this.products = response.data;
    //     },
    //     error: (err) => {
    //       console.error("Error:", err);
    //     }
    //   });
  }

}
