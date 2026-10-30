# AutoRepuestos Pro — HT-02

Sitio demostrativo de e-commerce para talleres mecánicos. HTML5 + CSS3 + JavaScript sin frameworks.

## Funciones
- Catálogo de 12 productos ilustrativos, seis categorías, búsqueda y ordenamiento.
- Carrito con cantidades, subtotal y persistencia local mediante localStorage.
- Preparación de cotizaciones por `mailto:` (no se envían pedidos al servidor).
- Formulario de contacto con validación nativa.
- Diseño responsive, metadatos SEO básicos y secciones de conversión.

## Publicación GitHub → Netlify
1. Crear un repositorio en GitHub y subir `index.html`, `styles.css`, `app.js` y `netlify.toml` a la raíz.
2. En Netlify seleccionar **Add new project > Import an existing project > GitHub**.
3. Seleccionar repositorio. No requiere comando de build. Directorio de publicación: `.`.
4. Publicar y comprobar la URL generada.

## Antes de usarlo como tienda real
- Reemplazar `ventas@ejemplo.com` en `app.js` por un correo real.
- Reemplazar productos, precios e iconos por inventario, precios e imágenes con derechos de uso.
- Añadir backend, base de datos, autenticación segura, gestión centralizada de pedidos y proveedor de pagos.
- Publicar políticas de privacidad, términos, devoluciones, envíos y contacto empresarial.
- Integrar analítica y consentimiento cuando corresponda. No incluir claves privadas en JavaScript público.

## Campañas de tráfico (plan académico)
**Objetivo:** captar solicitudes de cotización de talleres.
**Canales:** Google Ads (intención de compra) y Meta Ads (segmentación y remarketing, sujeto a consentimiento).
**Ejemplos:** `?utm_source=google&utm_medium=cpc&utm_campaign=repuestos_talleres` y `?utm_source=facebook&utm_medium=paid_social&utm_campaign=promo_frenos`.
**KPIs:** sesiones, CTR, CPC, tasa de solicitudes, coste por lead, tasa de conversión.
**Nota:** no hay campañas activas, ni seguimiento instalado, ni métricas reales.

## Limitaciones
Este proyecto es una demostración funcional del frontend. No procesa pagos, no valida inventario ni almacena pedidos centralmente. El carrito se guarda solo en el navegador actual.


## Área de clientes (actualización)
Se añadió un modal responsive para **registro, inicio de sesión, perfil y cierre de sesión**.
Las cuentas se almacenan únicamente en el `localStorage` del navegador y la sesión en `sessionStorage`.
La contraseña no se guarda en texto plano: se utiliza un hash SHA-256 con sal aleatoria, pero **esto no constituye autenticación segura ni reemplaza un backend**. No usar contraseñas reales.
Las cuentas no se sincronizan entre dispositivos ni existe recuperación de contraseñas. Para producción, integrar autenticación administrada y base de datos segura.

## Estructura requerida HT-02
- Catálogo: sección `#catalogo`.
- Empresa: sección `#empresa`.
- Contacto: sección `#contacto`.
- Carrito: panel lateral.
- Área de clientes: botón «Ingresar», registro y acceso de demostración.


## Pago y contacto (actualización)
El carrito ahora abre una pantalla de **selección de método de pago** (Yape o tarjeta).
Ambos son **solo una simulación**: no se solicitan números de tarjeta, no se cobra, no se genera QR, ni se marca como pagado. Se prepara una solicitud por correo.
Antes de publicar: sustituir `ventas@ejemplo.com` por el correo real y completar el número telefónico oficial. No se inventó un número ni se insertó una cuenta Yape.
Para pagos reales: contratar/integrar una pasarela autorizada con backend seguro y verificación de webhook, nunca guardar datos de tarjeta en el frontend.


## Versión multipágina
Páginas HTML reales: `index.html`, `catalogo.html`, `empresa.html`, `promociones.html`, `contacto.html`, `carrito.html` y `clientes.html`.
Navegación con enlaces entre archivos; se comparten `styles.css`, `app.js` y el almacenamiento local del carrito.
Para conservar el funcionamiento de los componentes existentes sin reescribir la aplicación, cada página contiene el mismo shell HTML y CSS muestra las secciones pertinentes. Esta es una solución académica, no una arquitectura de producción optimizada.
El teléfono oficial y la cuenta Yape **siguen pendientes**. No hay cobros reales.
