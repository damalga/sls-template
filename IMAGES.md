# Image Placeholder Guide

This template uses [placehold.co](https://placehold.co) for product images in the sample data. This is intentional to keep the template lightweight and easy to customize.

## Current Image Setup

Sample products in `database/sample-products.sql` use placeholder URLs like:
```
https://placehold.co/600x400/png?text=Product+Name
```

## Replacing with Your Own Images

You have several options:

### Option 1: Self-Hosted Images (Recommended)

1. Add your images to `public/images/`
2. Organize by product/category:
   ```
   public/images/
   ├── product-1/
   │   ├── main.jpg
   │   ├── gallery-1.jpg
   │   └── gallery-2.jpg
   ├── product-2/
   │   └── main.jpg
   └── ...
   ```
3. Reference in database:
   ```sql
   img = '/images/product-1/main.jpg'
   images = '["/images/product-1/gallery-1.jpg", "/images/product-1/gallery-2.jpg"]'
   ```

### Option 2: CDN/Cloud Storage

Use a service like:
- **Cloudinary** (free tier available)
- **Cloudflare Images**
- **AWS S3 + CloudFront**
- **Netlify Large Media**

Example with Cloudinary:
```sql
img = 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/product-1.jpg'
```

### Option 3: Keep Using Placeholders

For development or MVP, keep using `placehold.co`:

```
https://placehold.co/600x400/png?text=Your+Text
https://placehold.co/600x400/4A90E2/white?text=Custom+Colors
```

## Recommended Image Specs

For best performance:

- **Main product image**: 800x800px, JPEG/WebP, < 200KB
- **Gallery images**: 800x800px, JPEG/WebP, < 150KB each
- **Thumbnails**: 300x300px, JPEG/WebP, < 50KB
- **Hero/banner**: 1920x600px, JPEG/WebP, < 300KB

## Image Optimization Tips

1. **Use WebP format** for smaller file sizes
2. **Compress images** with tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/) (macOS)
3. **Lazy load** images (already implemented in template)
4. **Use responsive images** with `srcset` for different screen sizes
5. **Consider a build-time optimizer** like `vite-plugin-image-optimizer`

## Logo Placeholder

The template references logo files in `public/logo/`. You should replace these with your own:

- `public/logo/png/32x32.png` - Favicon
- `public/logo/png/64x64.png` - Small logo
- `public/logo/png/128x128.png` - Medium logo
- `public/logo/svg/512x512.svg` - Scalable logo

Create simple placeholder logos or use a tool like [Favicon.io](https://favicon.io/).

## Next Steps

1. Choose your image hosting strategy
2. Prepare/optimize your product images
3. Update `database/sample-products.sql` with new URLs
4. Update logo files in `public/logo/`
5. Re-run database migration to update products

---

**Need help with images?** Check out:
- [Cloudinary Getting Started](https://cloudinary.com/documentation)
- [Netlify Large Media Docs](https://docs.netlify.com/large-media/overview/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
