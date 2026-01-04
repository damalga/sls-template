# Contributing to Serverless Shop Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug:

1. Check if the issue already exists in [Issues](../../issues)
2. If not, create a new issue with:
   - Clear title describing the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Suggesting Features

Have an idea for improvement?

1. Check existing [Issues](../../issues) and [Discussions](../../discussions)
2. Create a new issue with:
   - Clear description of the feature
   - Use case / why it's needed
   - Proposed implementation (if you have ideas)

### Submitting Pull Requests

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly**:
   - Run `pnpm run build` (should succeed)
   - Test checkout flow end-to-end
   - Check responsiveness on mobile
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add: feature description"
   git commit -m "Fix: bug description"
   git commit -m "Update: what was updated"
   ```
6. **Push**: `git push origin feature/your-feature-name`
7. **Create Pull Request** with:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots (for UI changes)

## Development Guidelines

### Code Style

- Use **Prettier** for formatting: `pnpm run format`
- Follow **ESLint** rules: `pnpm run lint`
- Use **Vue 3 Composition API** (not Options API)
- Use **TypeScript types** in JSDoc comments for better IDE support

### Component Guidelines

- Use **PascalCase** for component filenames: `ProductCard_comp.vue`
- Use **camelCase** for composables: `useProducts.js`
- Keep components **focused** - one responsibility per component
- Use **props** for data down, **emits** for events up

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add product search functionality
fix: resolve cart total calculation error
docs: update SETUP.md with Neon instructions
```

### Testing Your Changes

Before submitting:

1. **Run the build**: `pnpm run build`
2. **Test locally**: `pnpm run dev:nl`
3. **Test checkout flow**:
   - Add items to cart
   - Proceed to checkout
   - Complete payment (use Stripe test cards)
   - Verify success page
4. **Test edge cases**:
   - Out of stock products
   - Variant selection
   - Cart persistence
5. **Check responsiveness** on mobile

## Project Structure

```
sls-template/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── composables/   # Composition API functions
│   ├── stores/        # Pinia state management
│   └── utils/         # Helper functions
├── netlify/functions/ # Serverless API endpoints
├── database/          # SQL schema and samples
└── public/            # Static assets
```

## Areas Needing Contribution

We'd love help with:

- **Documentation** - Improve guides, add examples
- **Testing** - Add unit/integration tests
- **Features**:
  - Product search
  - Product filtering improvements
  - Admin panel for product management
  - Order history page
  - Customer accounts
  - Email notifications
- **Performance** - Optimize bundle size, images
- **Accessibility** - Improve ARIA labels, keyboard navigation
- **Internationalization** - Multi-language support

## Questions?

- Open a [Discussion](../../discussions) for general questions
- Join our community chat (if available)
- Check existing [Issues](../../issues) and [Pull Requests](../../pulls)

---

Thank you for contributing! 🎉
