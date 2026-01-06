<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-links">
        <router-link to="/about" class="footer-link">About</router-link>
        <router-link to="/sfaq" class="footer-link">FAQ</router-link>
        <router-link to="/contact" class="footer-link">Contact</router-link>
      </div>
      <div class="footer-claim">
        <span>
          &copy; {{ new Date().getFullYear() }} SLS Shop — All rights reserved.
        </span>
      </div>
    </div>
  </footer>
</template>
