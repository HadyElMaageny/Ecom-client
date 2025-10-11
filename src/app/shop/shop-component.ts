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
  isLoading: boolean = true;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.sortingOptions = [
      {name: 'Name', code: 'name'},
      {name: 'PriceAsc', code: 'PriceAsc'},
      {name: 'PriceDesc', code: 'PriceDesc'},
    ];
    this.getProducts();
    this.getCategories();
  }

  getProducts(categoryId?: number, sortOption?: string) {
    this.shopService.getProducts(categoryId, sortOption)
      .subscribe({
        next: (response: IApiResponse) => {
          this.products = response.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error:", err);
          this.isLoading = false;
        }
      });
    }

    getCategories() {
      this.shopService.getCategories()
        .subscribe({
          next: (response: IApiResponse) => {
            this.categories = response.data;
          },
          error: (err) => {
            console.error("Error:", err);
            this.isLoading = false;
          }
        });
    }

    onCategoryChange(event: any) {
      this.selectedCategory = event.value;
      this.getProducts(this.selectedCategory.id, this.selectedSortOption?.code);
    }

    onSortChange(event: any) {
      this.selectedSortOption = event.value;
      this.getProducts(this.selectedCategory?.id, this.selectedSortOption?.code);
    }
}
