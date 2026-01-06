#!/bin/bash

# Script to translate all Spanish text to English and remove Hackeed references

cd "$(dirname "$0")/.."

# Find all Vue and JS files
find src -type f \( -name "*.vue" -o -name "*.js" \) -exec sed -i \
  -e 's/hackeed\.com/your-domain.com/gI' \
  -e 's/Hackeed/SLS Shop/g' \
  -e 's/hackeed/sls-shop/gI' \
  -e 's/Sobre nosotros/About/g' \
  -e 's/sobre nosotros/about/g' \
  -e 's/Contacto/Contact/g' \
  -e 's/contacto/contact/g' \
  -e 's/Tienda/Shop/g' \
  -e 's/tienda/shop/g' \
  -e 's/Carrito/Cart/g' \
  -e 's/carrito/cart/g' \
  -e 's/Disponible/In stock/g' \
  -e 's/disponible/in stock/g' \
  -e 's/Cargando/Loading/g' \
  -e 's/cargando/loading/g' \
  -e 's/Producto no encontrado/Product not found/g' \
  -e 's/Disminuir cantidad/Decrease quantity/g' \
  -e 's/Aumentar cantidad/Increase quantity/g' \
  -e 's/Máximo/Maximum/g' \
  -e 's/unidades/units/g' \
  -e 's/Intentar Nuevamente/Try Again/g' \
  -e 's/Contactar Soporte/Contact Support/g' \
  -e 's/Información de Debug/Debug Information/g' \
  -e 's/Cliente de Prueba/Test Customer/g' \
  -e 's/Explora nuestro catálogo/Explore our catalog/g' \
  -e 's/Catálogo completo/Complete catalog/g' \
  -e 's/hardware hacking/tech products/g' \
  -e 's/Hardware Hacking/Tech Products/g' \
  -e 's/comprar flipper zero/buy products/g' \
  -e 's/herramientas pentesting/tech tools/g' \
  -e 's/productos hacking/tech products/g' \
  -e 's/España/ES/g' \
  -e 's/españa/es/g' \
  -e 's/español/English/g' \
  -e 's/Spanish/English/g' \
  {} \;

echo "Translation complete!"
