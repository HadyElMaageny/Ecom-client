import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/iproduct';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss'
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
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }

  /**
   * Select a specific image by index
   */
  selectImage(imageName: string): void {
    const index = this.product.photos?.findIndex(photo => photo.imageName === imageName);
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
