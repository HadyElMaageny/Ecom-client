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
  selectedSortOption: Sort | undefined;
  products: IProduct[] = [];
  categories!: ICategory[];
  selectedCategory: ICategory | undefined;
  isLoading: boolean = true;
  search: string = '';
  productParams: ProductParams = {};

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
    this.shopService
      .getProducts(this.selectedCategory?.id, this.selectedSortOption?.code, this.search)
      .subscribe({
        next: (response: IApiResponse) => {
          this.products = response.data.data;
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
    this.selectedCategory = event.value;
    this.getProducts();
  }

  onSortChange(event: any) {
    this.selectedSortOption = event.value;
    this.getProducts();
  }

  onSearch(searchValue: string) {
    this.search = searchValue;
    this.getProducts();
  }

  onReset() {
    this.search = '';
    this.selectedCategory = undefined;
    this.selectedSortOption = undefined;
    this.getProducts();
  }
}
