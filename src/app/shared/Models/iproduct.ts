export interface IProduct {
  id: number;
  name: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: Photo[];
  categoryName: string;
}

export interface Photo {
  imageName: string;
  productId: number;
}
