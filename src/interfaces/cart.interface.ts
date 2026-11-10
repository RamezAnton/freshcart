export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: { name: string };
  quantity?: number;
}

export interface CartItem {
  product: CartProduct;
  count: number;
  price: number;
}

export interface CartSnapshot {
  items: CartItem[];
  subtotal: number;
  discountedSubtotal?: number;
  id?: string;
}

export interface CartResponse {
  data?: {
    _id?: string;
    products?: (Omit<CartItem, "product"> & { product: CartProduct | string })[];
    totalCartPrice?: number;
    totalPriceAfterDiscount?: number;
  };
}
