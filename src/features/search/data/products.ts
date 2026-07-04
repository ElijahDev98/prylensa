import type { ProductImage } from "../types/product-gallery.types";

export interface MockProduct {
  id: string;
  title: string;
  brand: string;
  rating: number;
  reviews: number;

  currentPrice: number;
  previousPrice: number;
  discount: number;
  currency: string;

  images: ProductImage[];
}

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900",
    alt: "Smartphone front view",
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    alt: "Smartphone angle view",
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900",
    alt: "Smartphone back view",
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900",
    alt: "Smartphone display",
  },
];

export const MOCK_PRODUCT: MockProduct = {
  id: "iphone-15-pro-max",

  title: "Apple iPhone 15 Pro Max 256GB",

  brand: "Apple",

  rating: 4.8,

  reviews: 1267,

  currentPrice: 1899000,

  previousPrice: 2150000,

  discount: 12,

  currency: "NGN",

  images: PRODUCT_IMAGES,
};
