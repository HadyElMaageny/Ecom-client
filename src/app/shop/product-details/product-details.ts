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
  product: IProduct | null = null;
  isLoading = true;
  notFound = false;
  selectedImageIndex = 0;
  quantity = 1;

  readonly placeholderImage =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadData();
  }

  get mainImageUrl(): string {
    const photos = this.product?.photos;
    if (!photos?.length) {
      return this.placeholderImage;
    }
    return this.getImageUrl(photos[this.selectedImageIndex].imageName);
  }

  get discountPercent(): number {
    if (!this.product || this.product.oldPrice <= this.product.newPrice) {
      return 0;
    }
    return Math.round((1 - this.product.newPrice / this.product.oldPrice) * 100);
  }

  getImageUrl(imageName: string): string {
    return imageName ? this.shopService.baseUrl + imageName : this.placeholderImage;
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }

  private loadData(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.shopService.getProductDetails(id).subscribe({
      next: (response: IApiResponse) => {
        this.product = response.data;
        this.notFound = !response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.notFound = true;
        this.isLoading = false;
      },
    });
  }
}
