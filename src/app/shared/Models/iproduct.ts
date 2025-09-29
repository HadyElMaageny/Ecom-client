export interface IProduct {
  name: string
  description: string
  newPrice: number
  oldPrice: number
  photos: Photo[]
  categoryName: string
}

export interface Photo {
  imageName: string
  productId: number
}
