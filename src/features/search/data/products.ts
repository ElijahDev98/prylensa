/**
 * -----------------------------------------------------------------------------
 * File: products.ts
 * -----------------------------------------------------------------------------
 */

import type { ProductImage } from "../types/product-gallery.types";

export interface ProductFeature {
  id: string;
  label: string;
}

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

  features: ProductFeature[];

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

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max 256GB",
    brand: "Apple",
    rating: 4.8,
    reviews: 1267,
    currentPrice: 1899000,
    previousPrice: 2150000,
    discount: 12,
    currency: "NGN",
    features: [
      { id: "storage", label: "256 GB" },
      { id: "chip", label: "A17 Pro" },
      { id: "display", label: '6.7" OLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "galaxy-s25-ultra",
    title: "Samsung Galaxy S25 Ultra 512GB",
    brand: "Samsung",
    rating: 4.9,
    reviews: 1824,
    currentPrice: 2050000,
    previousPrice: 2280000,
    discount: 10,
    currency: "NGN",
    features: [
      { id: "storage", label: "512 GB" },
      { id: "chip", label: "Snapdragon 8 Elite" },
      { id: "display", label: '6.9" AMOLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "pixel-10-pro",
    title: "Google Pixel 10 Pro",
    brand: "Google",
    rating: 4.7,
    reviews: 648,
    currentPrice: 1675000,
    previousPrice: 1820000,
    discount: 8,
    currency: "NGN",
    features: [
      { id: "storage", label: "256 GB" },
      { id: "chip", label: "Tensor G5" },
      { id: "display", label: '6.8" OLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "xiaomi-15-ultra",
    title: "Xiaomi 15 Ultra",
    brand: "Xiaomi",
    rating: 4.8,
    reviews: 510,
    currentPrice: 1599000,
    previousPrice: 1715000,
    discount: 7,
    currency: "NGN",
    features: [
      { id: "storage", label: "512 GB" },
      { id: "camera", label: "Leica Camera" },
      { id: "display", label: '6.8" AMOLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "oneplus-13",
    title: "OnePlus 13",
    brand: "OnePlus",
    rating: 4.7,
    reviews: 402,
    currentPrice: 1499000,
    previousPrice: 1630000,
    discount: 8,
    currency: "NGN",
    features: [
      { id: "storage", label: "256 GB" },
      { id: "chip", label: "Snapdragon 8 Elite" },
      { id: "display", label: '6.8" AMOLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "iphone-16-pro",
    title: "Apple iPhone 16 Pro 256GB",
    brand: "Apple",
    rating: 4.9,
    reviews: 915,
    currentPrice: 1999000,
    previousPrice: 2200000,
    discount: 9,
    currency: "NGN",
    features: [
      { id: "storage", label: "256 GB" },
      { id: "chip", label: "A18 Pro" },
      { id: "display", label: '6.3" OLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "sony-xperia-1-vii",
    title: "Sony Xperia 1 VII",
    brand: "Sony",
    rating: 4.6,
    reviews: 298,
    currentPrice: 1780000,
    previousPrice: 1910000,
    discount: 7,
    currency: "NGN",
    features: [
      { id: "storage", label: "256 GB" },
      { id: "camera", label: "Alpha Camera" },
      { id: "display", label: '6.5" OLED' },
    ],
    images: PRODUCT_IMAGES,
  },

  {
    id: "asus-rog-phone-9",
    title: "ASUS ROG Phone 9 Pro",
    brand: "ASUS",
    rating: 4.8,
    reviews: 533,
    currentPrice: 1875000,
    previousPrice: 2050000,
    discount: 9,
    currency: "NGN",
    features: [
      { id: "storage", label: "512 GB" },
      { id: "chip", label: "Snapdragon 8 Elite" },
      { id: "display", label: '6.8" AMOLED 165Hz' },
    ],
    images: PRODUCT_IMAGES,
  },
];

export const DEFAULT_PRODUCT: MockProduct = MOCK_PRODUCTS[0];
