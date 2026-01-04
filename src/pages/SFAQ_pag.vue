<template>
  <Header />
  <main class="sfaq-main">
    <div class="sfaq-container">
      <section class="sfaq-section">
        <h3>FAQ</h3>
        <h4>Frequently Asked Questions</h4>
        <p>
          Find answers to common questions about our store, shipping, payments, and returns.
        </p>
        <p>
          If your question isn't answered here, feel free to visit our
          <router-link to="/contact" class="footer-link">Contact</router-link> page.
        </p>

        <h4>Payments & Data</h4>

        <h5>How do I pay?</h5>
        <p>
          We accept all major credit cards through Stripe. Your payment information is
          securely processed by Stripe - we never see or store your card details.
        </p>

        <h5>What do you do with my data?</h5>
        <p>
          We only collect the minimum information needed to process and ship your order.
          We don't sell your data or send spam emails. All purchases are guest checkouts
          - no account creation required.
        </p>

        <br />

        <h4>Shipping</h4>

        <h5>Where do you ship from?</h5>
        <p>
          Currently shipping from [Your Location]. Domestic orders arrive quickly,
          international shipping may take longer.
        </p>

        <h5>How long does shipping take?</h5>
        <p>
          Typically 2-5 business days for domestic orders. You'll receive tracking
          information via email once your order ships.
        </p>

        <h5>How much does shipping cost?</h5>
        <p>
          Shipping costs are calculated at checkout based on your location and order size.
        </p>

        <br />

        <h4>Returns & Refunds</h4>

        <h5>Can I return an item?</h5>
        <p>
          Yes, you have 14 days from receipt to return items in original condition.
        </p>

        <h5>Who pays for return shipping?</h5>
        <p>
          Customer pays return shipping unless the error was ours.
        </p>

        <h5>What if my order arrives damaged?</h5>
        <p>
          Contact us immediately with photos and we'll send a replacement or issue a refund.
        </p>
      </section>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'FAQ | Serverless Shop',
  description:
    'Answers to frequently asked questions about payments, shipping, returns, and more.',
  keywords:
    'faq, help, shipping, returns, payments, customer support',
  url: 'https://your-domain.com/sfaq',
  image: 'https://your-domain.com/images/og-faq.jpg',
})

// Structured Data - FAQPage Schema
useSchema({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards through Stripe. Your payment information is securely processed by Stripe - we never see or store your card details.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do you do with my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We only collect the minimum information needed to process and ship your order. We don\'t sell your data or send spam emails.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically 2-5 business days for domestic orders. You\'ll receive tracking information via email once your order ships.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I return an item?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you have 14 days from receipt to return items in original condition.',
      },
    },
  ],
})
</script>
