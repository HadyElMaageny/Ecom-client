import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop-service';
import { IProduct } from '../shared/Models/iproduct';
import { ICategory } from '../shared/Models/icategory';
import { ProductParams } from '../shared/Models/ProductParams';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  featuredProducts: IProduct[] = [];
  categories: ICategory[] = [];
  totalProducts = 0;
  isLoading = true;
  heroImages: string[] = [];
  readonly currentYear = new Date().getFullYear();

  readonly features: Feature[] = [
    { icon: 'fa-truck', title: 'Free Shipping', text: 'On all orders over $50' },
    { icon: 'fa-lock', title: 'Secure Payment', text: '100% protected checkout' },
    { icon: 'fa-undo', title: 'Easy Returns', text: '30-day return policy' },
    { icon: 'fa-headphones', title: '24/7 Support', text: 'We are here to help' },
  ];

  private readonly categoryIcons: Record<string, string> = {
    electronics: 'fa-laptop',
    clothing: 'fa-shopping-bag',
    books: 'fa-book',
    'home & garden': 'fa-home',
    'sports & outdoors': 'fa-futbol-o',
    'beauty & personal care': 'fa-magic',
    'toys & games': 'fa-puzzle-piece',
    'food & beverages': 'fa-coffee',
    'health & wellness': 'fa-heartbeat',
    automotive: 'fa-car',
  };

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  getCategoryIcon(name: string): string {
    return this.categoryIcons[name?.toLowerCase()] ?? 'fa-tags';
  }

  private loadFeaturedProducts(): void {
    const params = new ProductParams();
    params.sort = 'PriceDesc';
    params.pageSize = 3;

    this.shopService.getProducts(params).subscribe({
      next: (response) => {
        this.featuredProducts = response.data.data;
        this.totalProducts = response.data.totalCount;
        this.heroImages = this.featuredProducts
          .filter((p) => p.photos?.length)
          .slice(0, 2)
          .map((p) => this.shopService.baseUrl + p.photos[0].imageName);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
    });
  }

  private loadCategories(): void {
    this.shopService.getCategories().subscribe({
      next: (response) => (this.categories = response.data),
      error: (err) => console.error('Error:', err),
    });
  }
}
