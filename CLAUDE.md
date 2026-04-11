# Murallón - Sitio Web

Marca de pinturas y revestimientos de Unike Group S.A. (Argentina).

## Stack
- **Framework:** Nuxt 4 (SSR deshabilitado, SPA)
- **UI:** Vue 3 + Tailwind CSS v4 (via @tailwindcss/vite)
- **Backend:** Supabase (auth + storage + DB)
- **Iconos:** @nuxt/icon con material-symbols (Iconify)
- **Imágenes:** @nuxt/image (formato WebP)
- **Fuente:** Barlow (weights 300-800, via @nuxt/fonts)
- **SEO:** @nuxtjs/seo
- **URL:** https://www.murallon.com.ar/

## Estructura del proyecto
```
app/
├── assets/css/main.css       # Tema Tailwind: colores, breakpoints, fuentes
├── components/
│   ├── button/               # Primary, Terciary (rounded-full, h-12)
│   ├── carousel/             # Static (drag/touch/dots/arrows), Arrows
│   ├── default/              # Header, Footer, Main, Section (layout)
│   ├── faq/                  # Accordion
│   ├── filter/               # Dropdown (searchable, usado en distribuidores)
│   ├── heading/              # H1, H2
│   ├── home/                 # Hero, Destacados, Inspiracion, Blog, Distribuidores, PreguntasFrecuentes
│   │   └── hero/             # Soluciones (3 cards con links)
│   ├── product/              # Card (configurable via props)
│   ├── search/               # Hero, Filtros, FiltrosAplicados, Toggle, SortSelect, RangeSlider, Label, EstadoVacio
│   ├── blog/                 # Card
│   └── inspiracion/          # Card (before/after hover)
├── composables/              # useProductos, useProductosSearch, useBlog, useInspiracion, useDistribuidores
├── constants/                # ROUTE_NAMES
├── layouts/                  # default (Header + slot + Footer)
├── pages/                    # index, productos
├── types/                    # database.types.ts (placeholder)
└── utils/                    # getAccionProducto
```

## Design tokens (main.css)
- **Colores:** primary (#1F436E), secondary (#10345C), terciary (#F2D373), dark (#010101), light (#F9F9F9), error (#F03A36), gray-mid (#E9E9E9), gray-orange (#ACA19C)
- **Gradiente:** linear-gradient(90deg, #E95C94 → #EBC213 → #B2CC38 → #50AC35 → #3F78BC) — usado en footer
- **Breakpoints:** sm:480, tab:600, md:768, lg:1080, xl:1280, xxl:1440
- **Sombra:** shadow-1 (0px 1px 4px rgba(12,12,13,0.15))
- **Max-width contenedor:** xxl:max-w-326 (1304px, via DefaultSection)
- **Line-height global:** 1.2 (forzado en todos los elementos)
- **Utility custom:** scrollbar-hide

## Convenciones
- Componentes: PascalCase, agrupados por feature
- Composables: camelCase con prefijo `use`
- Auto-imports de Nuxt (no hace falta import de ref, computed, onMounted, etc.)
- Responsive: mobile-first con clases de breakpoint
- Padding lateral de secciones: px-4 md:px-8 lg:px-16
- Gap progresivo: gap-3 md:gap-4 lg:gap-6 xxl:gap-8
- Cards: rounded-2xl o rounded-3xl con shadow-1
- Botones: rounded-full, h-12, py-3.5 px-6
- Iconos: material-symbols via `<Icon name="material-symbols:icon-name" />`

## Componentes clave

### Layout
- **DefaultHeader:** h-16 md:h-24, logo + CTA "Somos Unike Group" (visible lg+)
- **DefaultFooter:** gradiente multi + secciones Contacto/Producto/Ayuda + redes sociales
- **DefaultMain:** flex-col con gap progresivo
- **DefaultSection:** max-w-326 centrado, innerClass configurable

### Botones
- **ButtonPrimary:** bg-primary, text-white. Props: to, target, disabled, icon, type
- **ButtonTerciary:** bg-terciary, text-primary. Mismas props

### Headings
- **HeadingH1:** text-[1.375rem] lg:text-5xl font-bold
- **HeadingH2:** text-xl lg:text-[1.75rem] font-bold

### Cards
- **ProductCard:** fondo dinámico (codigo_color_card), patrón + imagen producto. Props configurables: showAccion, showTamanos, showDetalle, heightClass, imageClass
- **BlogCard:** imagen + fecha + título + extracto + "Leer más". h-86 md:h-90 lg:h-114
- **InspiracionCard:** before/after con hover. h-70 md:h-90 lg:h-112

### Carousel
- **CarouselStatic:** drag/touch, responsive slidesPerView, dots, arrows, keyboard nav. Props: gap, slidesPerView (breakpoint object), showDots, showArrows
- **CarouselArrows:** prev/next, visible md+

## Supabase

### Proyecto: UnikeGroup (sa-east-1)
- **ID:** fxytgajevhfuzwlyaorb

### Tablas
- **murallon-productos:** id, nombre, imagen_principal, uso (ARRAY), tamanos_disponibles (ARRAY), tipos_aplicacion_id (FK), categorias_id (FK), rendimiento (text), destacado (bool), codigo_color_card, created_at
- **murallon-categorias:** id, nombre, created_at — Valores: Enduidos, Fijadores, Látex, Membranas, Microlátex, Pintura para frentes / revestimiento
- **tipos_aplicacion:** id, nombre — IDs mapeados en getAccionProducto.js
- **blog-murallon:** id, titulo, fecha, contenido, imagen_principal
- **inspiracion-murallon:** id, titulo, imagen_antes, imagen_despues, orden
- **waterplast-distribuidores:** nombreComercio, provincia, localidad, calle, telefono, latitud, longitud, vende (array con 'murallon')

### Storage buckets
- murallon-productos, blog-murallon, inspiracion-murallon
- URL: `{supabaseUrl}/storage/v1/object/public/{bucket}/{path}`

## Páginas

### Home (/)
Composición secuencial:
1. HomeHero — split image + texto + CTA
2. HomeHeroSoluciones — 3 cards (carousel mobile, grid 4-cols desktop)
3. HomeDestacados — carousel de ProductCard (destacado=true)
4. HomeInspiracion — carousel before/after
5. HomeDistribuidores — filtros cascading + Google Maps
6. HomeBlog — carousel de BlogCard
7. HomePreguntasFrecuentes — 6 FAQs en 2 columnas

### Productos (/productos)
- **Composable:** `useProductosSearch` — fetch all + filtrado local reactivo
- **Hero:** imagen responsive (4 breakpoints) + 3 cards de soluciones que filtran por tipo_aplicacion
- **Filtros aplicados:** contador + pills removibles + "Limpiar filtros"
- **Sidebar (md+):** SearchFiltros con toggles para categorías, usos, tamaños + range slider rendimiento
- **Grilla:** grid 1 sm:2 lg:3 cols de ProductCard (con showTamanos + showDetalle)
- **Estado vacío:** SearchEstadoVacio con botón restablecer

### Filtrado de productos
- **Categorías:** toggle por nombre de categoría (join con murallon-categorias)
- **Usos:** toggle Interior/Exterior (campo `uso` es ARRAY en DB)
- **Tamaños:** toggle 1L/4L/10L/20L (campo `tamanos_disponibles` es ARRAY en DB)
- **Rendimiento:** range slider 1-16 m²/L (campo `rendimiento` es texto, se parsea el primer número)
- **Soluciones:** filtro por tipo_aplicacion via cards del hero (toggle on/off)

## Composables

| Composable | Tabla | Filtro fetch | Campos join |
|---|---|---|---|
| useProductos | murallon-productos | destacado=true | tipos_aplicacion_id(id,nombre) |
| useProductosSearch | murallon-productos | todos | tipos_aplicacion_id + categorias_id |
| useBlog | blog-murallon | order fecha DESC | — |
| useInspiracion | inspiracion-murallon | order orden ASC | — |
| useDistribuidores | waterplast-distribuidores | vende contains 'murallon' | — |

## Utils
- **getAccionProducto(id):** mapea UUID de tipo_aplicacion a texto: "Impermeabilizá con", "Prepará con", "Pintá con"
