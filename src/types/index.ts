export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  color: string;
  sizes: string[];
  isFeatured?: boolean;
  stitchingEnabled: boolean;
  rating: number;
  reviewCount: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  isCustom: boolean;
};

