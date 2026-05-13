export interface ProductType {
  id: string;
  order?: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  presentations: PresentationProduct[];
  createdAt?: string;
}

export interface PresentationProduct {
  label: string;
  price: number;
}

export interface CartItemType {
  productId: string;
  productName: string;
  imageUrl: string;
  presentation: PresentationProduct;
  quantity: number;
  subtotal: number;
}