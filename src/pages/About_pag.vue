<template>
  <div>
    <Header />
    <main class="about-main">
      <div class="about-container">
        <section class="about-section">
          <h2>Cut hosting friction and launch your e-commerce</h2>
          <p>
            <strong>Don't pay for a hosting you don't use.</strong>
            <br />
            <br />
            Setting up an online store shouldn't start with hiring a server that
            sits there 24/7 charging you, whether the store is open or not. It's
            like paying rent for a commercial space you only open on weekends.
            <br />
            <br />
            <strong>Serverless</strong> means not needing a server, that is,
            paying only when someone visits your store. Zero visits, zero cost.
            A thousand visits, you pay for a thousand visits. That simple. When
            someone enters, it turns on. When they leave, it shuts down.
            Meanwhile, you pay nothing.
            <br />
            <br />
            I've built this template to make it easier to create an online store
            based on this concept.
            <br />
            <br />
            Built with:
            <br />
            -
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Vite</strong></a
            >
            for compiling
            <br />
            -
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Vue 3</strong></a
            >
            for the interface (with Pinia for state management)
            <br />
            -
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Netlify</strong></a
            >
            for serverless functions and deployment
            <br />
            -
            <a
              href="https://neon.tech/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Neon</strong></a
            >
            for database (PostgreSQL). Charges you per usage (CU, Compute
            Units). Low traffic = zero cost. High traffic = you're probably
            selling and can afford it
            <br />
            -
            <a
              href="https://stripe.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Stripe</strong></a
            >
            for payments
            <br />
            <br />
            But build it with whatever you want. If you're technically inclined,
            I encourage you to question every part, rip out what you don't like,
            and build based on your preferences. The idea isn't to copy this
            line by line, but to understand the concept and adapt it to your
            philosophy or way of working.
            <br />
            <br />
            <strong>Why does this exist?</strong> Because traditional e-commerce
            is fine, but not for everyone.
            <br />
            <br />
            <a
              href="https://shopify.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Shopify</strong></a
            >
            or
            <a
              href="https://www.prestashop.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>PrestaShop</strong></a
            >
            work like a charm. If you have budget and want to start selling
            tomorrow, don't overthink it… But if what you want is to understand
            how your own store works, have total access to your data, pay less
            commissions per sale, and build on something that's yours… you need
            something else.
            <br />
            <br />
            This template is that something else. It's not perfect. It still
            uses third-party infrastructure. I'm not selling you absolute
            digital sovereignty. But I am bringing you fewer dependencies, lower
            fixed costs, and more control.
            <br />
            <br />
            If you want to go more radical and host everything on your own
            server, do it. If you want to plug in your favorite content manager,
            go ahead. If you want to swap the database for JSON files, perfect.
            The code is on
            <a
              href="https://github.com/damalga/sls-template"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>GitHub</strong></a
            >. Clone it, break it, improve it. Do whatever you want with it.
            <br />
            <br />
            This isn't about revolutionizing anything. It's about showing
            there's another way to build e-commerce: lighter, cheaper, and more
            yours.
            <br />
            <br />
            If you have any questions, I'd be happy for you to
            <router-link to="/contact">contact me</router-link> and try to solve
            any problem that comes up.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'About | Serverless E-commerce Template',
  description:
    'A serverless e-commerce template built with Vue 3, Netlify, Neon PostgreSQL, and Stripe. Pay only when someone visits your store. Zero traffic = zero cost.',
  keywords:
    'serverless ecommerce, vue template, netlify functions, neon database, stripe payments, open source store',
  url: 'https://your-domain.com/about',
  image: 'https://your-domain.com/images/og-about.jpg',
})

// Structured Data - AboutPage Schema
useSchema({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Serverless E-commerce Template',
  description:
    'Serverless e-commerce template that charges only for actual usage. Built with Vue 3, Netlify, Neon PostgreSQL, and Stripe.',
  url: 'https://your-domain.com/about',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Serverless E-commerce Template',
    description:
      'Open-source serverless online store template with zero hosting costs.',
    url: 'https://your-domain.com',
    applicationCategory: 'E-commerce',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  },
})
</script>
