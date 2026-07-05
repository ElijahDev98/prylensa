/**
 * -----------------------------------------------------------------------------
 * File: trending-products.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

export interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  currentPrice: string;
  priceChange: string;
}

export const TRENDING_PRODUCTS: TrendingProduct[] = [
  {
    id: "1",
    name: "Apple iPhone 16 Pro",
    category: "Smartphones",
    currentPrice: "₦1,999,000",
    priceChange: "-5%",
  },
  {
    id: "2",
    name: "Samsung Galaxy S25 Ultra",
    category: "Smartphones",
    currentPrice: "₦2,050,000",
    priceChange: "-3%",
  },
  {
    id: "3",
    name: "Sony WH-1000XM6",
    category: "Audio",
    currentPrice: "₦645,000",
    priceChange: "-7%",
  },
  {
    id: "4",
    name: "MacBook Pro M5",
    category: "Laptop",
    currentPrice: "₦4,250,000",
    priceChange: "-2%",
  },
];
