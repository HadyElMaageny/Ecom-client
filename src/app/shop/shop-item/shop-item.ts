import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/iproduct';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss',
})
export class ShopItem {
  @Input() product: IProduct = {} as IProduct;
  selectedImageIndex: number = 0;
  baseUrl: string = 'http://localhost:5000';

  /**
   * Get the main image URL (first image in the photos array)
   */
  getMainImageUrl(): string {
    if (this.product.photos && this.product.photos.length > 0) {
      return this.getImageUrl(this.product.photos[this.selectedImageIndex].imageName);
    }
    return this.getDefaultImageUrl();
  }

  /**
   * Get the full image URL by combining base URL with image path
   */
  getImageUrl(imageName: string): string {
    if (!imageName) {
      return this.getDefaultImageUrl();
    }
    return `${this.baseUrl}${imageName}`;
  }

  /**
   * Get default placeholder image URL
   */
  getDefaultImageUrl(): string {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  }

  /**
   * Select a specific image by index
   */
  selectImage(imageName: string): void {
    const index = this.product.photos?.findIndex((photo) => photo.imageName === imageName);
    if (index !== undefined && index >= 0) {
      this.selectedImageIndex = index;
    }
  }

  /**
   * Handle image loading errors
   */
  onImageError(event: any): void {
    event.target.src = this.getDefaultImageUrl();
  }
}
