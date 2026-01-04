# Complete Setup Guide

This guide will walk you through setting up your serverless e-commerce store from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup (Neon)](#database-setup-neon)
4. [Stripe Setup](#stripe-setup)
5. [Netlify Setup](#netlify-setup)
6. [Testing](#testing)
7. [Going Live](#going-live)

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))
- A **GitHub** account
- A **Netlify** account (free tier is fine)
- A **Neon** account (free tier is fine)
- A **Stripe** account (test mode is free)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sls-template
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required packages including Vue, Vite, Stripe, etc.

### 3. Install Netlify CLI

```bash
npm install -g netlify-cli
```

This allows you to run Netlify Functions locally.

---

## Database Setup (Neon)

### 1. Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (recommended)
3. Create a new project

### 2. Get Your Database URL

1. In the Neon dashboard, click on your project
2. Go to the "Connection Details" section
3. Copy the connection string (starts with `postgresql://`)
4. It should look like this:
   ```
   postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 3. Run the Database Schema

You have two options:

#### Option A: Using psql (recommended)

```bash
# Install psql if you don't have it
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql-client
# Windows: Download from postgresql.org

# Run the schema
psql "postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require" -f database/schema.sql

# Load sample products
psql "postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require" -f database/sample-products.sql
```

#### Option B: Using Neon SQL Editor

1. Go to your Neon dashboard
2. Click "SQL Editor"
3. Copy contents of `database/schema.sql`
4. Paste and execute
5. Repeat with `database/sample-products.sql`

### 4. Verify Database

Run this query in Neon SQL Editor:

```sql
SELECT COUNT(*) FROM products;
```

You should see 5 sample products.

---

## Stripe Setup

### 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. You'll start in "Test mode" (perfect for development)

### 2. Get Your API Keys

1. Go to Developers → API keys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Keep these safe - you'll need them next

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
# Database (from Neon)
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require

# Stripe (from Stripe dashboard)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxx

# App URL (for local development)
VITE_APP_URL=http://localhost:8888

# Webhook secret (we'll add this later)
STRIPE_WEBHOOK_SECRET=
```

**Important**: Never commit your `.env` file! It's already in `.gitignore`.

### 4. Test Locally

```bash
pnpm run dev:nl
```

Visit `http://localhost:8888` and try adding a product to cart.

---

## Netlify Setup

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure build settings:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### Option B: Netlify CLI

```bash
netlify login
netlify init
netlify deploy --prod
```

### 3. Add Environment Variables in Netlify

1. Go to Site settings → Environment variables
2. Add each variable from your `.env` file:
   - `DATABASE_URL`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `VITE_APP_URL` (use your Netlify URL: `https://your-site.netlify.app`)

3. Trigger a new deploy for changes to take effect

### 4. Configure Stripe Webhook

Now that your site is live, set up the webhook:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL:
   ```
   https://your-site.netlify.app/.netlify/functions/stripe_webhook
   ```
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)
7. Add it to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`
8. Redeploy

---

## Testing

### Test the Complete Flow

1. **Browse products**:
   - Visit your site
   - Click on a product
   - View product details

2. **Add to cart**:
   - Select variant (if applicable)
   - Click "Add to cart"
   - Verify cart shows correct items

3. **Checkout**:
   - Go to cart
   - Click "Proceed to checkout"
   - You'll be redirected to Stripe

4. **Complete payment** (use test card):
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

5. **Verify success**:
   - You should be redirected to success page
   - Check Stripe dashboard for payment
   - Check database for stock updates

### Test Edge Cases

- Try to buy more than available stock
- Test variant selection
- Test cart persistence (refresh page, cart should remain)
- Test mobile responsiveness

---

## Going Live

### 1. Switch to Live Mode

When ready for real payments:

1. In Stripe, toggle to "Live mode"
2. Get new live API keys (start with `pk_live_` and `sk_live_`)
3. Update Netlify environment variables with live keys
4. Update webhook endpoint for live mode
5. Test with a real card (you'll be charged!)

### 2. Custom Domain (Optional)

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Netlify: Site settings → Domain management
3. Add custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### 3. Update Environment Variables

Update `VITE_APP_URL` to your custom domain in Netlify.

### 4. Update SEO

Edit these files with your actual information:
- `src/pages/About_pag.vue` - SEO meta tags
- `src/pages/SFAQ_pag.vue` - FAQ content
- `index.html` - Page title

---

## Common Issues

### "Failed to connect to database"

- Verify `DATABASE_URL` is correct
- Check Neon dashboard - is database active?
- Ensure URL includes `?sslmode=require`

### "Stripe checkout not loading"

- Check browser console for errors
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set
- Make sure you're using Netlify Dev (`pnpm run dev:nl`)

### "Webhook not receiving events"

- Verify webhook URL is correct
- Check Netlify function logs
- Ensure `STRIPE_WEBHOOK_SECRET` is set
- Test webhook in Stripe dashboard

### "Stock not updating after purchase"

- Check webhook is receiving events
- Verify `stripe_webhook.js` function is deployed
- Check Netlify function logs for errors

---

## Next Steps

- **Add more products**: Update `database/sample-products.sql`
- **Customize design**: Edit SCSS files in `src/assets/styles/`
- **Add analytics**: Integrate Google Analytics or Plausible
- **Email notifications**: Set up Stripe email receipts
- **Admin panel**: Build an admin interface for managing products

---

## Need Help?

- Check the [README.md](./README.md) for general information
- Review Netlify function logs
- Check browser console for errors
- Inspect Stripe dashboard for payment issues
- Review Neon logs for database issues

---

**Congratulations!** 🎉

You now have a fully functional serverless e-commerce store!
