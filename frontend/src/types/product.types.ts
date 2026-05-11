export interface ProductType {
  id: string;
  order: number;
  name: string;
  description: string;
  category: string;
  imageURL: string;
  presentations: PresentationProduct[];
  createdAt: string;
}

export interface PresentationProduct {
  label: string;
  price: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  presentation: PresentationProduct;
  quantity: number;
  subtotal: number;
}