import { promises as fs } from 'fs';
import { join } from 'path';
// import { neon } from '@netlify/neon';

export async function handler() {
  try {
    console.log('getProducts: Starting function');

    // OPTION 1: Load from JSON file (default)
    // To use database instead, uncomment the database code below and comment out this section
    const jsonPath = join(process.cwd(), 'database', 'sample-products.json');
    console.log('getProducts: Reading from JSON file:', jsonPath);
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const rows = JSON.parse(jsonData);
    console.log(`getProducts: Loaded ${rows.length} products from JSON`);

    // Add IDs if not present (for JSON compatibility)
    const rowsWithIds = rows.map((product, index) => ({
      ...product,
      id: product.id || index + 1,
      description: product.description || product.desc,
      created_at: product.created_at || new Date().toISOString()
    }));

    /*
    // OPTION 2: Load from Neon Database
    // Uncomment this section to use PostgreSQL database instead of JSON
    const sql = neon();
    console.log('getProducts: Executing SQL query');
    const rowsWithIds = await sql`
      SELECT
        id,
        sku,
        name,
        description,
        long_desc,
        img,
        images,
        price_cents,
        stock,
        active,
        brand,
        category,
        features,
        variants,
        created_at
      FROM products
      WHERE active = true
      ORDER BY created_at DESC
    `;
    console.log(`getProducts: Found ${rowsWithIds.length} products from database`);
    */

    console.log('getProducts: Sample product:', rowsWithIds[0]);

    // Transform data to match frontend schema
    const products = rowsWithIds.map((product, index) => {
      try {
        // Parse variants if needed
        let variants = product.variants ? (typeof product.variants === 'string' ? JSON.parse(product.variants) : product.variants) : null;

        // Calculate product availability
        let productInStock;

        if (variants && variants.options) {
          // Product available if at least one variant has stock
          productInStock = variants.options.some(option => {
            // Use stock field if available, otherwise fallback to inStock boolean
            return option.stock ? option.stock > 0 : option.inStock === true;
          });

          // Ensure each option has inStock field calculated from stock
          variants.options = variants.options.map(option => ({
            ...option,
            // Preserve numeric stock if exists
            stock: option.stock !== undefined ? option.stock : (option.inStock ? 999 : 0),
            // Calculate inStock from stock for compatibility
            inStock: option.stock !== undefined ? option.stock > 0 : option.inStock === true
          }));
        } else {
          // No variants: use general product stock
          productInStock = product.stock > 0;
        }

        const transformed = {
          id: product.id,
          sku: product.sku,
          name: product.name,
          desc: product.description,
          longDesc: product.long_desc,
          img: product.img,
          images: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [],
          price: product.price_cents ? product.price_cents / 100 : 0,
          category: product.category ? (typeof product.category === 'string' ? JSON.parse(product.category) : product.category) : [],
          brand: product.brand,
          inStock: productInStock,
          features: product.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : [],
          variants: variants,
          createdAt: product.created_at
        };

        console.log(`getProducts: Transformed product ${index}:`, {
          id: transformed.id,
          name: transformed.name,
          hasImages: transformed.images.length > 0,
          hasFeatures: transformed.features.length > 0,
          hasVariants: !!transformed.variants
        });

        return transformed;
      } catch (transformErr) {
        console.error(`getProducts: Error transforming product ${index}:`, transformErr);
        console.error('getProducts: Raw product data:', product);
        throw transformErr;
      }
    });

    console.log(`getProducts: Successfully transformed ${products.length} products`);

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (err) {
    console.error('getProducts: Function error:', err);
    console.error('getProducts: Error stack:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        details: 'Check server logs for more information'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
}
