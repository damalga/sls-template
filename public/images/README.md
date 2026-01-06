# Product Images Directory

This directory contains all product images for your e-commerce template.

## Image Structure

For the sample products in `database/sample-products.json`, you'll need the following images:

### Product 1
- `product-1.jpg` - Main product image
- `product-1-1.jpg` - Gallery image 1
- `product-1-2.jpg` - Gallery image 2
- `product-1-3.jpg` - Gallery image 3

### Product 2
- `product-2.jpg` - Main product image
- `product-2-1.jpg` - Gallery image 1
- `product-2-2.jpg` - Gallery image 2

### Product 3
- `product-3.jpg` - Main product image
- `product-3-1.jpg` - Gallery image 1
- `product-3-2.jpg` - Gallery image 2
- `product-3-3.jpg` - Gallery image 3
- `product-3-4.jpg` - Gallery image 4

### Product 4
- `product-4.jpg` - Main product image
- `product-4-1.jpg` - Gallery image 1
- `product-4-2.jpg` - Gallery image 2

## Image Requirements

### Recommended Specifications
- **Format**: JPG, PNG, or WebP
- **Main Image Size**: 800x800px minimum
- **Gallery Images**: 800x800px minimum
- **Aspect Ratio**: 1:1 (square) for consistency
- **File Size**: Keep under 500KB for optimal loading

### Naming Convention
- Use lowercase letters
- Separate words with hyphens (-)
- Use descriptive names: `product-name-variant.jpg`

## Usage

### In JSON File
Reference images with absolute paths from the public directory:
```json
{
  "img": "/images/product-1.jpg",
  "images": [
    "/images/product-1-1.jpg",
    "/images/product-1-2.jpg"
  ]
}
```

### In Database
Store the same path structure in the database:
```sql
INSERT INTO products (img, images) VALUES (
  '/images/product-1.jpg',
  '["/images/product-1-1.jpg", "/images/product-1-2.jpg"]'::jsonb
);
```

## Placeholder Images

If you don't have product images yet, you can use placeholder services:

- **Unsplash Source**: `https://source.unsplash.com/800x800/?product`
- **Placeholder.com**: `https://via.placeholder.com/800x800`
- **Lorem Picsum**: `https://picsum.photos/800/800`

Example:
```json
{
  "img": "https://source.unsplash.com/800x800/?tech,product",
  "images": [
    "https://source.unsplash.com/800x800/?tech,gadget",
    "https://source.unsplash.com/800x800/?electronics"
  ]
}
```

## Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Use WebP**: Modern format with better compression
3. **Lazy Loading**: The template includes lazy loading by default
4. **CDN**: Consider using a CDN for faster delivery

## Need Help?

Check the main [README.md](../../README.md) for more information about customizing the template.
