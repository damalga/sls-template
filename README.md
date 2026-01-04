# Serverless E-Commerce Template

A modern, fully-functional serverless e-commerce template built with **Vue 3**, **Netlify Functions**, **Neon PostgreSQL**, and **Stripe**.

## 🚀 Features

- **Serverless Architecture**: No server management, scales automatically
- **Complete Shopping Cart**: Add/remove items, variant support, localStorage persistence
- **Stripe Integration**: Secure checkout with Stripe
- **Product Variants**: Support for product options (colors, sizes, etc.)
- **Stock Management**: Real-time stock tracking per product/variant
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Modern Stack**: Vue 3, Vite, Pinia, Vue Router
- **Type-Safe**: Clean code structure with composables and stores

## 📦 Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **Pinia** - State management
- **Vue Router** - Official router for Vue
- **SCSS** - CSS preprocessor
- **@vueuse/head** - Document head manager

### Backend
- **Netlify Functions** - Serverless functions
- **Neon PostgreSQL** - Serverless Postgres database
- **Stripe** - Payment processing
- **@netlify/neon** - Neon database integration

## 🏗️ Project Structure

```
sls-template/
├── src/
│   ├── components/       # Vue components
│   ├── pages/           # Page components
│   ├── composables/     # Reusable composition functions
│   ├── stores/          # Pinia stores
│   ├── utils/           # Helper functions
│   ├── assets/styles/   # SCSS styles
│   ├── App.vue          # Root component
│   ├── main.js          # App entry point
│   └── router.js        # Vue Router config
├── netlify/functions/   # Serverless functions
│   ├── getProducts.js       # Fetch products from DB
│   ├── stripe_checkout.js   # Create Stripe checkout session
│   ├── stripe_verify.js     # Verify payment status
│   ├── stripe_webhook.js    # Handle Stripe events
│   └── debugProducts.js     # Debug helper
├── database/            # Database schema and samples
│   ├── schema.sql           # Database structure
│   └── sample-products.sql  # Example products
├── public/              # Static assets
├── .env.example         # Environment variables template
├── netlify.toml         # Netlify configuration
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 🎯 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Netlify account
- Neon database account
- Stripe account

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd sls-template

# Install dependencies
pnpm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Neon Database URL
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require

# Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# App URL
VITE_APP_URL=http://localhost:8888
```

### 3. Set Up Database

Create your database on [Neon](https://console.neon.tech/) and run the schema:

```bash
# Connect to your Neon database and run:
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/sample-products.sql
```

### 4. Run Development Server

```bash
# Start Netlify Dev (includes serverless functions)
pnpm run dev:nl

# Or just Vite (frontend only)
pnpm run dev
```

Visit `http://localhost:8888`

## 📊 Database Schema

The template includes a complete e-commerce database schema:

- **products** - Product catalog with variants support
- **customers** - Customer information
- **orders** - Order records
- **order_items** - Individual items in orders
- **addresses** - Shipping/billing addresses
- **stripe_events** - Webhook event log

### Product Structure

Products support complex configurations:

```json
{
  "id": 1,
  "sku": "PROD-001",
  "name": "Product Name",
  "description": "Short description",
  "long_desc": "Detailed description",
  "img": "main-image-url",
  "images": ["image1", "image2"],
  "price_cents": 9999,
  "stock": 50,
  "brand": "Brand Name",
  "category": ["category1", "category2"],
  "features": ["feature1", "feature2"],
  "variants": {
    "name": "Color",
    "options": [
      {
        "id": "red",
        "name": "Red",
        "stock": 10,
        "selected": {"color": "red"}
      }
    ]
  }
}
```

## 🔐 Stripe Integration

### Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Set up webhook endpoint: `https://your-site.netlify.app/.netlify/functions/stripe_webhook`
4. Listen for events: `checkout.session.completed`, `payment_intent.succeeded`

### Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🚢 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Add environment variables in Netlify UI
4. Deploy!

```bash
# Or use Netlify CLI
netlify init
netlify env:import .env
netlify deploy --prod
```

### Post-Deployment

1. Update `VITE_APP_URL` in Netlify environment variables
2. Configure Stripe webhook URL
3. Test checkout flow

## 🎨 Customization

### Branding

1. Update `index.html` title
2. Replace logo in `public/logo/`
3. Modify colors in `src/assets/styles/_colors.scss`
4. Customize `About_pag.vue` and `SFAQ_pag.vue`

### Products

- Add products via SQL inserts or create an admin panel
- Update `sample-products.sql` with your inventory
- Modify product schema if needed

### Styles

All styles are in `src/assets/styles/`:
- `_colors.scss` - Color variables
- `_typography.scss` - Fonts and text styles
- Component-specific SCSS files

## 📚 Key Components

### Stores (Pinia)

- **cartStore** - Shopping cart logic, localStorage persistence
- **productModalStore** - Product detail modal state
- **productVariantsStore** - Variant selection logic

### Composables

- **useProducts** - Fetch products from API
- **useStripe** - Stripe checkout integration
- **usePageMeta** - SEO meta tags
- **useSchema** - Structured data

### Netlify Functions

All functions are in `netlify/functions/`:

- **getProducts** - Returns active products from database
- **stripe_checkout** - Creates Stripe checkout session
- **stripe_verify** - Verifies payment completion
- **stripe_webhook** - Processes Stripe webhooks (updates stock)

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Run dev server with functions
pnpm run dev:nl

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint

# Format code
pnpm run format
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check Neon dashboard for database status
- Ensure database accepts connections

### Stripe Checkout Not Working
- Verify publishable key starts with `pk_test_` or `pk_live_`
- Check Netlify function logs
- Test with Stripe test cards

### Functions Not Working Locally
- Use `pnpm run dev:nl` instead of `pnpm run dev`
- Check Netlify CLI is installed
- Verify `.env` file exists

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Credits

This template was created as a simplified, open-source foundation for building serverless e-commerce applications.

Built with ❤️ using Vue, Netlify, Neon, and Stripe.

---

**Need help?** Check the [SETUP.md](./SETUP.md) for detailed setup instructions.
