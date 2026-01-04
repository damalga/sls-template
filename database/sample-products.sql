-- =============================================================================
-- SAMPLE PRODUCTS
-- =============================================================================
-- Example products to populate your database
-- Run this AFTER schema.sql
-- =============================================================================

-- Clear existing sample data (optional)
-- TRUNCATE TABLE products CASCADE;

-- -----------------------------------------------------------------------------
-- Product 1: Simple product without variants
-- -----------------------------------------------------------------------------
INSERT INTO products (
    sku,
    name,
    description,
    long_desc,
    img,
    images,
    price_cents,
    stock,
    brand,
    category,
    features,
    variants,
    active
) VALUES (
    'PROD-001',
    'Premium Wireless Headphones',
    'High-quality wireless headphones with noise cancellation',
    'Experience superior sound quality with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    'https://placehold.co/600x400/png?text=Headphones',
    '["https://placehold.co/600x400/png?text=Headphones+Front", "https://placehold.co/600x400/png?text=Headphones+Side", "https://placehold.co/600x400/png?text=Headphones+Detail"]'::jsonb,
    29999,  -- $299.99
    50,
    'AudioTech',
    '["electronics", "audio"]'::jsonb,
    '["Active Noise Cancellation", "30h Battery Life", "Bluetooth 5.0", "Comfortable Design"]'::jsonb,
    NULL,  -- No variants
    true
);

-- -----------------------------------------------------------------------------
-- Product 2: Product with color variants
-- -----------------------------------------------------------------------------
INSERT INTO products (
    sku,
    name,
    description,
    long_desc,
    img,
    images,
    price_cents,
    stock,
    brand,
    category,
    features,
    variants,
    active
) VALUES (
    'PROD-002',
    'Smart Watch Pro',
    'Advanced fitness tracking and notifications',
    'Stay connected and track your health with our Smart Watch Pro. Features heart rate monitoring, GPS, and water resistance up to 50m.',
    'https://placehold.co/600x400/png?text=Smart+Watch',
    '["https://placehold.co/600x400/png?text=Watch+Display", "https://placehold.co/600x400/png?text=Watch+Side", "https://placehold.co/600x400/png?text=Watch+Apps"]'::jsonb,
    39999,  -- $399.99
    0,  -- Stock managed by variants
    'TechGear',
    '["electronics", "wearables"]'::jsonb,
    '["Heart Rate Monitor", "GPS Tracking", "50m Water Resistant", "7-day Battery"]'::jsonb,
    '{
        "name": "Color",
        "options": [
            {
                "id": "black",
                "name": "Black",
                "stock": 25,
                "selected": {"color": "black"}
            },
            {
                "id": "silver",
                "name": "Silver",
                "stock": 15,
                "selected": {"color": "silver"}
            },
            {
                "id": "rose-gold",
                "name": "Rose Gold",
                "stock": 10,
                "selected": {"color": "rose-gold"}
            }
        ]
    }'::jsonb,
    true
);

-- -----------------------------------------------------------------------------
-- Product 3: Product with size variants
-- -----------------------------------------------------------------------------
INSERT INTO products (
    sku,
    name,
    description,
    long_desc,
    img,
    images,
    price_cents,
    stock,
    brand,
    category,
    features,
    variants,
    active
) VALUES (
    'PROD-003',
    'Performance Running Shoes',
    'Lightweight running shoes for maximum comfort',
    'Engineered for speed and comfort. Our Performance Running Shoes feature responsive cushioning, breathable mesh upper, and durable rubber outsole.',
    'https://placehold.co/600x400/png?text=Running+Shoes',
    '["https://placehold.co/600x400/png?text=Shoes+Side", "https://placehold.co/600x400/png?text=Shoes+Top", "https://placehold.co/600x400/png?text=Shoes+Sole"]'::jsonb,
    12999,  -- $129.99
    0,
    'SportMax',
    '["sports", "footwear"]'::jsonb,
    '["Responsive Cushioning", "Breathable Mesh", "Lightweight Design", "Durable Outsole"]'::jsonb,
    '{
        "name": "Size",
        "options": [
            {"id": "us-8", "name": "US 8", "stock": 5, "selected": {"size": "8"}},
            {"id": "us-9", "name": "US 9", "stock": 8, "selected": {"size": "9"}},
            {"id": "us-10", "name": "US 10", "stock": 12, "selected": {"size": "10"}},
            {"id": "us-11", "name": "US 11", "stock": 6, "selected": {"size": "11"}},
            {"id": "us-12", "name": "US 12", "stock": 3, "selected": {"size": "12"}}
        ]
    }'::jsonb,
    true
);

-- -----------------------------------------------------------------------------
-- Product 4: Simple digital product
-- -----------------------------------------------------------------------------
INSERT INTO products (
    sku,
    name,
    description,
    long_desc,
    img,
    images,
    price_cents,
    stock,
    brand,
    category,
    features,
    variants,
    active
) VALUES (
    'PROD-004',
    'Portable Bluetooth Speaker',
    'Compact speaker with powerful sound',
    'Take your music anywhere with our portable Bluetooth speaker. Featuring 12-hour battery life, IPX7 waterproofing, and 360-degree sound.',
    'https://placehold.co/600x400/png?text=Speaker',
    '["https://placehold.co/600x400/png?text=Speaker+Front", "https://placehold.co/600x400/png?text=Speaker+Back"]'::jsonb,
    7999,  -- $79.99
    100,
    'SoundWave',
    '["electronics", "audio"]'::jsonb,
    '["12h Battery", "IPX7 Waterproof", "360° Sound", "Compact Design"]'::jsonb,
    NULL,
    true
);

-- -----------------------------------------------------------------------------
-- Product 5: Out of stock example
-- -----------------------------------------------------------------------------
INSERT INTO products (
    sku,
    name,
    description,
    long_desc,
    img,
    images,
    price_cents,
    stock,
    brand,
    category,
    features,
    variants,
    active
) VALUES (
    'PROD-005',
    'Gaming Mechanical Keyboard',
    'RGB backlit mechanical keyboard',
    'Dominate your games with our premium mechanical keyboard. Cherry MX switches, customizable RGB lighting, and programmable macros.',
    'https://placehold.co/600x400/png?text=Keyboard',
    '["https://placehold.co/600x400/png?text=Keyboard+RGB", "https://placehold.co/600x400/png?text=Keyboard+Detail"]'::jsonb,
    14999,  -- $149.99
    0,  -- Out of stock
    'GameGear',
    '["electronics", "gaming"]'::jsonb,
    '["Cherry MX Switches", "RGB Backlight", "Programmable Macros", "Aluminum Frame"]'::jsonb,
    NULL,
    true
);
