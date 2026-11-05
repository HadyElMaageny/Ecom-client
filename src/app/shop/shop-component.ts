import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/iproduct';
import { ShopService } from './shop-service';
import { IApiResponse } from '../shared/Models/iapi-response';
import { CategoryResponse, ICategory } from '../shared/Models/icategory';
import { ProductParams } from '../shared/Models/ProductParams';
import { ActivatedRoute } from '@angular/router';

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
  selectedSort: Sort | null = null;
  selectedCategory: ICategory | null = null;

  constructor(private shopService: ShopService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Allow deep-linking to a category, e.g. /shop?categoryId=1 (used by the home page)
    const categoryId = Number(this.route.snapshot.queryParamMap.get('categoryId'));
    if (categoryId > 0) {
      this.productParams.categoryId = categoryId;
    }
    this.sortingOptions = [
      { name: 'Name', code: 'name' },
      { name: 'PriceAsc', code: 'PriceAsc' },
      { name: 'PriceDesc', code: 'PriceDesc' }
    ];
    // Set initial selected sort based on default sort value
    this.selectedSort = this.sortingOptions.find(option => option.code === this.productParams.sort) || this.sortingOptions[0];
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
        this.selectedCategory =
          this.categories.find((c) => c.id === this.productParams.categoryId) ?? null;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
    });
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.value;
    this.productParams.categoryId = event.value?.id || 0;
    this.getProducts();
  }

  onSortChange(event: any) {
    this.selectedSort = event.value;
    this.productParams.sort = event.value?.code || '';
    this.getProducts();
  }

  onSearch(searchValue: string) {
    this.productParams.search = searchValue;
    this.getProducts();
  }

  onReset() {
    this.productParams.search = '';
    this.productParams.categoryId = 0;
    this.productParams.sort = 'name';
    this.selectedSort = this.sortingOptions[0];
    this.selectedCategory = null;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.productParams.pageNumber = event.page;
    this.getProducts();
  }
}
