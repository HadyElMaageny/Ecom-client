import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/iproduct';
import { ShopService } from './shop-service';
import { IApiResponse } from '../shared/Models/iapi-response';
import { CategoryResponse, ICategory } from '../shared/Models/icategory';
import { ProductParams } from '../shared/Models/ProductParams';

interface Sort {
  name: string;
  code: string;
}

@Component({
  selector: 'app-shop-component',
  standalone: false,
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.scss',
})
export class ShopComponent implements OnInit {
  sortingOptions: Sort[] = [];
  products: IProduct[] = [];
  categories!: ICategory[];
  isLoading: boolean = true;
  totalCount: number = 0;
  productParams = new ProductParams();

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.sortingOptions = [
      { name: 'Name', code: 'name' },
      { name: 'PriceAsc', code: 'PriceAsc' },
      { name: 'PriceDesc', code: 'PriceDesc' },
    ];
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.shopService.getProducts(this.productParams).subscribe({
      next: (response: IApiResponse) => {
        this.products = response.data.data;
        this.totalCount = response.data.totalCount;
        this.productParams.pageNumber = response.data.pageNumber;
        this.productParams.pageSize = response.data.pageSize;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (response: CategoryResponse) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
    });
  }

  onCategoryChange(event: any) {
    this.productParams.categoryId = event.value.id;
    this.getProducts();
  }

  onSortChange(event: any) {
    this.productParams.sort = event.value;
    this.getProducts();
  }

  onSearch(searchValue: string) {
    this.productParams.search = searchValue;
    this.getProducts();
  }

  onReset() {
    this.productParams.search = '';
    this.productParams.categoryId = 0;
    this.productParams.sort = '';
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.productParams.pageNumber = event.page;
    this.getProducts();
  }
}
