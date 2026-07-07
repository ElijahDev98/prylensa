/**
 * -----------------------------------------------------------------------------
 * File: products.ts
 * Feature: Product Domain
 *
 * Purpose:
 * Canonical Product Catalog.
 *
 * NOTE:
 * Products contain identity and specifications only.
 * Pricing belongs to the Offer Domain.
 * -----------------------------------------------------------------------------
 */

import type {
  Product,
  ProductImage,
  ProductSpecification,
} from "../types/product.types";

const PHONE_IMAGES: ProductImage[] = [
  {
    id: "front",
    url: "/products/phone-front.png",
    alt: "Front View",
  },
  {
    id: "back",
    url: "/products/phone-back.png",
    alt: "Back View",
  },
];

function specification(
  id: string,
  name: string,
  value: string,
): ProductSpecification {
  return {
    id,
    name,
    value,
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "iphone-15-pro-max",

    title: "Apple iPhone 15 Pro Max",

    brand: "Apple",

    category: "Smartphone",

    description: "Apple flagship smartphone powered by the A17 Pro chip.",

    rating: 4.8,

    reviewCount: 1267,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "256 GB"),
      specification("display", "Display", "6.7-inch OLED"),
      specification("chip", "Processor", "A17 Pro"),
    ],
  },

  {
    id: "galaxy-s25-ultra",

    title: "Samsung Galaxy S25 Ultra",

    brand: "Samsung",

    category: "Smartphone",

    description: "Samsung premium flagship powered by Snapdragon 8 Elite.",

    rating: 4.9,

    reviewCount: 1824,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "512 GB"),
      specification("display", "Display", "6.9-inch AMOLED"),
      specification("chip", "Processor", "Snapdragon 8 Elite"),
    ],
  },

  {
    id: "pixel-10-pro",

    title: "Google Pixel 10 Pro",

    brand: "Google",

    category: "Smartphone",

    description: "Google flagship powered by Tensor G5.",

    rating: 4.7,

    reviewCount: 648,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "256 GB"),
      specification("display", "Display", "6.8-inch OLED"),
      specification("chip", "Processor", "Tensor G5"),
    ],
  },

  {
    id: "xiaomi-15-ultra",

    title: "Xiaomi 15 Ultra",

    brand: "Xiaomi",

    category: "Smartphone",

    description: "Flagship Xiaomi smartphone featuring Leica optics.",

    rating: 4.8,

    reviewCount: 510,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "512 GB"),
      specification("camera", "Camera", "Leica"),
      specification("display", "Display", "6.8-inch AMOLED"),
    ],
  },

  {
    id: "oneplus-13",

    title: "OnePlus 13",

    brand: "OnePlus",

    category: "Smartphone",

    description: "Performance-focused Android flagship.",

    rating: 4.7,

    reviewCount: 402,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "256 GB"),
      specification("display", "Display", "6.8-inch AMOLED"),
      specification("chip", "Processor", "Snapdragon 8 Elite"),
    ],
  },

  {
    id: "iphone-16-pro",

    title: "Apple iPhone 16 Pro",

    brand: "Apple",

    category: "Smartphone",

    description: "Apple A18 Pro flagship smartphone.",

    rating: 4.9,

    reviewCount: 915,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "256 GB"),
      specification("display", "Display", "6.3-inch OLED"),
      specification("chip", "Processor", "A18 Pro"),
    ],
  },

  {
    id: "sony-xperia-1-vii",

    title: "Sony Xperia 1 VII",

    brand: "Sony",

    category: "Smartphone",

    description: "Sony flagship with Alpha camera technology.",

    rating: 4.6,

    reviewCount: 298,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "256 GB"),
      specification("camera", "Camera", "Sony Alpha"),
      specification("display", "Display", "6.5-inch OLED"),
    ],
  },

  {
    id: "asus-rog-phone-9",

    title: "ASUS ROG Phone 9 Pro",

    brand: "ASUS",

    category: "Gaming Smartphone",

    description: "Gaming flagship with high refresh-rate display.",

    rating: 4.8,

    reviewCount: 533,

    images: PHONE_IMAGES,

    specifications: [
      specification("storage", "Storage", "512 GB"),
      specification("display", "Display", "6.8-inch AMOLED 165Hz"),
      specification("chip", "Processor", "Snapdragon 8 Elite"),
    ],
  },
];
