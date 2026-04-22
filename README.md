# Plantilla Serverless para E-Commerce

Una plantilla de tienda online completamente funcional construida con **Vue 3**, **Netlify Functions**, **Neon PostgreSQL** y **Stripe**.

## Qué incluye

- **Arquitectura serverless**: Sin gestión de servidores, escala automáticamente
- **Carrito de compras completo**: Añadir/eliminar productos, soporte para variantes, persistencia en localStorage
- **Integración con Stripe (opcional)**: Checkout seguro con Stripe, se puede desactivar si no lo necesitas
- **Base de datos opcional**: Usa Neon PostgreSQL o un archivo JSON para los productos
- **Variantes de productos**: Soporte para opciones como colores, tallas, etc.
- **Control de stock**: Seguimiento en tiempo real del stock por producto y variante
- **Diseño responsive**: Funciona en cualquier dispositivo
- **Optimizado para SEO**: Meta tags, datos estructurados y sitemap
- **Stack moderno**: Vue 3, Vite, Pinia, Vue Router
- **Código limpio**: Estructura clara con composables y stores

## Stack técnico

### Frontend
- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Herramienta de desarrollo rápida
- **Pinia** - Gestión de estado
- **Vue Router** - Router oficial de Vue
- **SCSS** - Preprocesador CSS
- **@vueuse/head** - Gestión del head del documento

### Backend
- **Netlify Functions** - Funciones serverless
- **Neon PostgreSQL** - Base de datos Postgres serverless
- **Stripe** - Procesamiento de pagos
- **@netlify/neon** - Integración con Neon

## Estructura del proyecto

```
sls-template/
├── src/
│   ├── components/       # Componentes Vue
│   ├── pages/           # Componentes de páginas
│   ├── composables/     # Funciones de composición reutilizables
│   ├── stores/          # Stores de Pinia
│   ├── utils/           # Funciones auxiliares
│   ├── assets/styles/   # Estilos SCSS
│   ├── App.vue          # Componente raíz
│   ├── main.js          # Punto de entrada de la app
│   └── router.js        # Configuración de Vue Router
├── netlify/functions/       # Funciones serverless
│   ├── getProducts.js           # Obtiene productos de la BD
│   ├── stripe_checkout.js       # Crea sesión de checkout de Stripe
│   ├── stripe_verify.js         # Verifica estado del pago
│   ├── stripe_webhook.js        # Maneja eventos de Stripe
│   ├── debugProducts.js         # Helper de debug
│   └── neon_database_setup.js   # Configuración inicial de la BD
├── database/                # Schema y ejemplos de BD
│   ├── schema.sql               # Estructura de la base de datos PostgreSQL
│   ├── sample-products.sql      # Productos de ejemplo (SQL)
│   └── sample-products.json     # Productos de ejemplo (JSON - 4 productos)
├── public/                  # Assets estáticos
│   └── sample-products.json     # Copia de productos de ejemplo
├── .env.example             # Plantilla de variables de entorno
├── netlify.toml             # Configuración de Netlify
├── package.json             # Dependencias
└── vite.config.js           # Configuración de Vite
```

## Inicio rápido

### Requisitos previos

- Node.js 18+ y pnpm
- Cuenta en Netlify (opcional, para despliegue)
- Cuenta en Neon (opcional, puedes usar archivo JSON)
- Cuenta en Stripe (opcional, para procesar pagos)

### 1. Clonar e instalar

```bash
# Clona el repositorio
git clone <tu-repo-url>
cd sls-template

# Instala las dependencias
pnpm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# URL de la base de datos Neon
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require

# Keys de Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# URL de la app
VITE_APP_URL=http://localhost:8888
```

### 3. Configurar base de datos (opcional)

**Opción A: Usar archivo JSON (sin base de datos)**

La plantilla incluye `database/sample-products.json` con 4 productos de ejemplo. Para usar JSON en lugar de base de datos:

1. Modifica `netlify/functions/getProducts.js` para leer del archivo JSON
2. Actualiza las imágenes de productos en `/public/images/`
3. Edita `sample-products.json` con tus productos

**Opción B: Usar Neon PostgreSQL**

Crea tu base de datos en [Neon](https://console.neon.tech/) y ejecuta el schema:

```bash
# Conéctate a tu base de datos Neon y ejecuta:
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/sample-products.sql
```

> **Nota**: La estructura del archivo JSON coincide con el schema de Neon para facilitar la migración.

### 4. Ejecutar servidor de desarrollo

```bash
# Inicia Netlify Dev (incluye funciones serverless)
pnpm run dev:nl

# O solo Vite (solo frontend)
pnpm run dev
```

Visita `http://localhost:8888`

## Schema de la base de datos

La plantilla incluye un schema completo de base de datos para e-commerce:

- **products** - Catálogo de productos con soporte para variantes
- **customers** - Información de clientes
- **orders** - Registros de pedidos
- **order_items** - Items individuales de cada pedido
- **addresses** - Direcciones de envío y facturación
- **stripe_events** - Log de eventos del webhook

### Estructura de productos

Los productos soportan configuraciones complejas:

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
        "inStock": true,
        "selected": {"color": "red"}
      }
    ]
  }
}
```

## Integración con Stripe (opcional)

La integración con Stripe es **opcional**. La plantilla funciona sin ella para mostrar productos.

### Configuración

1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Obtén las API keys desde Dashboard → Developers → API keys
3. Añade las keys al archivo `.env`
4. Configura el webhook endpoint: `https://tu-sitio.netlify.app/.netlify/functions/stripe_webhook`
5. Escucha estos eventos: `checkout.session.completed`, `payment_intent.succeeded`

### Pruebas

Usa las tarjetas de test de Stripe:
- Éxito: `4242 4242 4242 4242`
- Rechazo: `4000 0000 0000 0002`

### Sin Stripe

Si no configuras Stripe:
- Los productos y el carrito funcionan normalmente
- El botón de checkout mostrará un mensaje de configuración
- Puedes usar la plantilla como catálogo de productos

## Despliegue

### Desplegar en Netlify

1. Sube el código a GitHub
2. Importa el proyecto en Netlify
3. Añade las variables de entorno en la UI de Netlify
4. Despliega

```bash
# O usa Netlify CLI
netlify init
netlify env:import .env
netlify deploy --prod
```

### Post-despliegue

1. Actualiza `VITE_APP_URL` en las variables de entorno de Netlify
2. Configura la URL del webhook de Stripe
3. Prueba el flujo de checkout

## Personalización

### Marca

1. Actualiza el título en `index.html`
2. Reemplaza el logo en `public/logo/`
3. Modifica los colores en `src/assets/styles/_colors.scss`
4. Personaliza `About_pag.vue` y `FAQ_pag.vue`

### Productos

**Usando archivo JSON:**
- Edita `database/sample-products.json`
- Actualiza los detalles, imágenes y precios de los productos
- Añade tus imágenes de productos en `/public/images/`

**Usando base de datos:**
- Añade productos mediante inserts SQL o crea un panel de administración
- Actualiza `sample-products.sql` con tu inventario
- Modifica el schema de productos si lo necesitas

**Estructura JSON de productos:**
```json
{
  "sku": "PROD-001",
  "name": "Product Name",
  "description": "Short description",
  "long_desc": "Detailed description",
  "img": "/images/product-1.jpg",
  "images": ["/images/product-1-1.jpg"],
  "price_cents": 2999,
  "stock": 50,
  "brand": "Brand Name",
  "category": ["category1"],
  "features": ["Feature 1", "Feature 2"],
  "variants": null,
  "active": true
}
```

### Estilos

Todos los estilos están en `src/assets/styles/`:
- `_colors.scss` - Variables de colores
- `_typography.scss` - Fuentes y estilos de texto
- Archivos SCSS específicos de cada componente

## Componentes clave

### Stores (Pinia)

- **cartStore** - Lógica del carrito, persistencia en localStorage
- **productModalStore** - Estado del modal de detalle de producto
- **productVariantsStore** - Lógica de selección de variantes

### Composables

- **useProducts** - Obtiene productos de la API
- **useStripe** - Integración con checkout de Stripe
- **usePageMeta** - Meta tags para SEO
- **useSchema** - Datos estructurados

### Funciones de Netlify

Todas las funciones están en `netlify/functions/`:

- **getProducts** - Devuelve productos activos de la base de datos
- **stripe_checkout** - Crea sesión de checkout de Stripe
- **stripe_verify** - Verifica la finalización del pago
- **stripe_webhook** - Procesa webhooks de Stripe (actualiza stock)

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo con funciones
pnpm run dev:nl

# Build para producción
pnpm run build

# Vista previa del build de producción
pnpm run preview

# Lint del código
pnpm run lint

# Formatear código
pnpm run format
```

## Solución de problemas

### Problemas de conexión con la base de datos
- Verifica el formato de `DATABASE_URL`
- Revisa el dashboard de Neon para ver el estado de la base de datos
- Asegúrate de que la base de datos acepta conexiones

### El checkout de Stripe no funciona
- Verifica que la publishable key empiece con `pk_test_` o `pk_live_`
- Revisa los logs de las funciones de Netlify
- Prueba con las tarjetas de test de Stripe

### Las funciones no funcionan en local
- Usa `pnpm run dev:nl` en lugar de `pnpm run dev`
- Verifica que Netlify CLI esté instalado
- Asegúrate de que el archivo `.env` existe

## Haz esta plantilla tuya

Esta plantilla es un punto de partida, no un producto final. Está pensada para que la rompas, modifiques y adaptes a tus necesidades:

- Quita lo que no uses (Stripe, la base de datos, páginas que no necesites)
- Cambia la estructura como te venga mejor
- Añade tus propias funcionalidades
- Ajústala a tu caso de uso específico

No hay una forma "correcta" de usarla. Si algo no te sirve, elimínalo. Si necesitas algo diferente, cámbialo.

Si encuentras formas de mejorar la plantilla base o quieres contribuir con mejoras, adelante.

## Demos

Proyectos construidos con esta plantilla:

- [hackeed.es](https://hackeed.es) - Tienda de hardware hacking y electrónica

