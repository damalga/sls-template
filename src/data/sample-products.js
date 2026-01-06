/**
 * SAMPLE PRODUCTS - E-Commerce Template
 *
 * This file contains 4 example products to demonstrate the template functionality.
 *
 * PURPOSE:
 * - Provide ready-to-use sample data for development and testing
 * - Show the complete product structure with all available fields
 * - Demonstrate how to configure products with and without variants
 * - Allow the template to work without requiring a database setup
 *
 * USAGE:
 * 1. During Development: Products load automatically from this file
 * 2. For Production: Replace with your actual product data or migrate to database
 * 3. Add Images: Place product images in /public/images/ (see /public/images/README.md)
 *
 * STRUCTURE:
 * - Products 1 & 3: Simple products without variants
 * - Product 2: Product with color variants (Black, White, Red)
 * - Product 4: Product with size variants (S, M, L, XL)
 *
 * FIELD REFERENCE:
 * - sku: Unique product identifier
 * - name: Product name
 * - description: Short description for product cards
 * - long_desc: Detailed description for product detail page
 * - img: Main product image URL
 * - images: Array of additional images for gallery
 * - price_cents: Price in cents (2999 = €29.99)
 * - stock: Available inventory (use 0 if using variants)
 * - brand: Product brand
 * - category: Array of category tags
 * - features: Array of product features/highlights
 * - variants: Object with variant configuration (null if no variants)
 * - active: Whether product is visible in store
 *
 * DATABASE COMPATIBILITY:
 * This structure matches the PostgreSQL schema in database/schema.sql
 * You can easily migrate to Neon database when ready.
 *
 * To switch to database: See netlify/functions/getProducts.js
 */

export const sampleProducts = [
  {
    sku: "PROD-001",
    name: "Sample Product 1",
    description: "This is a sample product description.",
    long_desc: "This is a longer description for Sample Product 1. You can add detailed information about the product features, specifications, and benefits here. Replace this text with your own product information.",
    img: "/images/product-1.jpg",
    images: [
      "/images/product-1.jpg",
      "/images/product-1-1.jpg",
      "/images/product-1-2.jpg",
      "/images/product-1-3.jpg"
    ],
    price_cents: 2999,
    stock: 50,
    brand: "Sample Brand",
    category: ["electronics", "gadgets"],
    features: [
      "Feature 1: High quality materials",
      "Feature 2: Long-lasting battery",
      "Feature 3: Easy to use",
      "Feature 4: 1 year warranty"
    ],
    variants: null,
    active: true
  },
  {
    sku: "PROD-002",
    name: "Sample Product 2",
    description: "Another sample product with variants.",
    long_desc: "Sample Product 2 comes in multiple colors. This product demonstrates how to use variants in your e-commerce template. Each variant can have its own stock level.",
    img: "/images/product-2.jpg",
    images: [
      "/images/product-2.jpg",
      "/images/product-2-1.jpg",
      "/images/product-2-2.jpg"
    ],
    price_cents: 4999,
    stock: 0,
    brand: "Sample Brand",
    category: ["electronics", "accessories"],
    features: [
      "Available in multiple variants",
      "Premium materials",
      "Compact design",
      "Free shipping"
    ],
    variants: {
      name: "Variants",
      default: "black",
      options: [
        {
          id: "black",
          name: "Black",
          price: 49.99,
          stock: 15,
          inStock: true,
          selected: {
            color: "black"
          }
        },
        {
          id: "white",
          name: "White",
          price: 49.99,
          stock: 10,
          inStock: true,
          selected: {
            color: "white"
          }
        },
        {
          id: "red",
          name: "Red",
          price: 49.99,
          stock: 0,
          inStock: false,
          selected: {
            color: "red"
          }
        }
      ]
    },
    active: true
  },
  {
    sku: "PROD-003",
    name: "Sample Product 3",
    description: "A third sample product.",
    long_desc: "This is Sample Product 3. Replace this with your actual product information. Add detailed specifications, usage instructions, and any other relevant information that your customers need to know.",
    img: "/images/product-3.jpg",
    images: [
      "/images/product-3.jpg",
      "/images/product-3-1.jpg",
      "/images/product-3-2.jpg",
      "/images/product-3-3.jpg",
      "/images/product-3-4.jpg"
    ],
    price_cents: 7999,
    stock: 25,
    brand: "Premium Brand",
    category: ["home", "accessories"],
    features: [
      "Premium quality",
      "Modern design",
      "Durable construction",
      "Easy maintenance"
    ],
    variants: null,
    active: true
  },
  {
    sku: "PROD-004",
    name: "Sample Product 4",
    description: "A sample product with size variants.",
    long_desc: "Sample Product 4 is available in different sizes. This demonstrates another type of variant configuration. Each size has its own pricing and stock management.",
    img: "/images/product-4.jpg",
    images: [
      "/images/product-4.jpg",
      "/images/product-4-1.jpg",
      "/images/product-4-2.jpg"
    ],
    price_cents: 3499,
    stock: 0,
    brand: "Sample Brand",
    category: ["clothing", "accessories"],
    features: [
      "Available in multiple variants",
      "Comfortable fit",
      "High-quality fabric",
      "Machine washable"
    ],
    variants: {
      name: "Variants",
      default: "small",
      options: [
        {
          id: "small",
          name: "Small",
          price: 34.99,
          stock: 8,
          inStock: true,
          selected: {
            size: "small"
          }
        },
        {
          id: "medium",
          name: "Medium",
          price: 34.99,
          stock: 12,
          inStock: true,
          selected: {
            size: "medium"
          }
        },
        {
          id: "large",
          name: "Large",
          price: 34.99,
          stock: 6,
          inStock: true,
          selected: {
            size: "large"
          }
        },
        {
          id: "xlarge",
          name: "X-Large",
          price: 34.99,
          stock: 0,
          inStock: false,
          selected: {
            size: "xlarge"
          }
        }
      ]
    },
    active: true
  }
]
