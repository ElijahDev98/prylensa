/**
 * -----------------------------------------------------------------------------
 * File: product.types.ts
 * Feature: Product Domain
 *
 * Purpose:
 * Defines the canonical Product model.
 *
 * NOTE:
 * Product does NOT own pricing.
 * -----------------------------------------------------------------------------
 */

export interface ProductImage {
  id: string;

  url: string;

  alt: string;
}

export interface ProductSpecification {
  id: string;

  name: string;

  value: string;
}

export interface Product {
  id: string;

  title: string;

  brand: string;

  category: string;

  description: string;

  rating: number;

  reviewCount: number;

  images: ProductImage[];

  specifications: ProductSpecification[];
}
