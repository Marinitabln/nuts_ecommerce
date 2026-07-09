
export interface PresentationType {
  label: string;
  supplierCost?: number;
  profitMargin?: number;
  finalPrice: number;
  stock?: number;
}

export interface ProductType {
  id: string;
  order?: number;
  name: string;
  description?: string;
  category: string;
  imageUrl: string;
  presentations: PresentationType[];
  createdAt?: string;
  active?: boolean;
}

export interface CartItemType {
  productId: string;
  productName: string;
  imageUrl: string;
  presentation: PresentationType;
  quantity: number;
  subtotal: number;
}
