# Athenea Joyería - Plataforma E-Commerce de Alta Gama

Este proyecto es una Single Page Application (SPA) Full Stack de comercio electrónico especializada en joyería fina y de alta gama ("Athenea Joyería"), desarrollada como Proyecto Integrador para la especialización Frontend de Henry. La aplicación implementa arquitectura por capas, tipado estricto con TypeScript, persistencia en la nube en tiempo real, carga segura de archivos en la nube y una completa suite de pruebas automatizadas.

---

## 1. Descripción del Proyecto y Contexto del Cliente

**Patagonix Tech** es una software factory especializada en soluciones de alto rendimiento para el sector retail. Un cliente exclusivo del rubro de alta joyería ("Aurea Joyas") solicitó una plataforma moderna, responsiva (mobile-first) y mantenible que reduzca costos de infraestructura y acelere el *time-to-market* mediante servicios administrados (Backend-as-a-Service o BaaS).

La plataforma soporta dos roles de usuario perfectamente diferenciados:
*   **Clientes (Customers):** Pueden navegar por colecciones exclusivas (anillos, collares, pulseras), buscar piezas, gestionar su lista de deseos (wishlist), añadir joyas a la bolsa de compras con persistencia local y realizar checkouts simulados con snapshots inmutables.
*   **Administradores (Admins):** Tienen acceso exclusivo a un panel de control protegido donde supervisan el inventario global, crean, editan y eliminan joyas (CRUD completo), suben de forma segura fotografías reales a la nube (AWS S3) y gestionan el estado logístico de los pedidos de los clientes.

---

## 2. Decisiones Arquitectónicas

Para garantizar un sistema escalable y mantenible a largo plazo, se tomaron las siguientes decisiones de diseño:

### A. Context API + useReducer para Gestión de Estado Complejo
Para la bolsa de compras (carrito), se eligió el patrón **`useReducer`** en lugar de `useState` simple. Un carrito de compras involucra reglas de negocio complejas y entrelazadas (validación de duplicados, incrementos de cantidad, eliminación automática si el stock llega a cero y cálculo matemático de totales). Centralizar este flujo en una función reductora pura garantiza la inmutabilidad del estado, previene errores de arrastre y facilita el testing unitario de forma aislada.

### B. Almacenamiento de Imágenes en AWS S3 (Presigned URLs)
Guardar archivos binarios pesados (como fotos de alta resolución de las joyas) en una base de datos de texto como Firestore es un antipatrón de diseño costoso e ineficiente. La arquitectura implementada almacena las imágenes en **AWS S3** (Simple Storage Service) y persiste únicamente la dirección de enlace (URL) de texto dentro del documento de Firestore. 

La subida se realiza mediante **URLs pre-firmadas (Presigned URLs)** generadas de forma asíncrona por una función sin servidor (Vercel Serverless Function), garantizando que las credenciales de Amazon S3 permanezcan del lado del servidor y nunca se expongan en el navegador del cliente.

### C. Arquitectura Limpia por Capas
El proyecto se dividió estrictamente en capas de responsabilidad (Separación de Responsabilidades):
*   **Capa de Presentación (UI/Pages):** Componentes limpios enfocados únicamente en pintar la pantalla, delegando los estilos repetitivos a archivos CSS específicos para evitar la saturación de código dentro del TSX.
*   **Capa de Estado Global (Contexts):** Orquesta la distribución del estado y los modificadores.
*   **Capa de Servicios (Services):** Funciones puras e independientes que se comunican directamente con Firebase o Vercel.
*   **Capa de Modelado (Types):** Interfaces de TypeScript que definen los contratos estrictos de la información.

---

## 3. Estructura del Proyecto (Árbol de Directorios)

La modularización de carpetas sigue de forma exacta la distribución de responsabilidades y capas definida para el proyecto:

```text
ecommerce-app/
├── api/
│   └── presign.ts                # Función Serverless de Vercel para S3 Presigned URLs
├── scripts/
│   └── seed.ts                   # Script de terminal para poblar 60 joyas de forma automática
├── src/
│   ├── assets/
│   │   └── googleLogo.png        # Logotipo de Google para la autenticación
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx   # Cascarón de menú y rutas del administrador
│   │   │   └── MainLayout.tsx    # Cascarón común (Navbar, Footer, Bolsa) de la tienda
│   │   └── ui/
│   │       ├── FilterBar.tsx     # Selector de colecciones (Anillos, Collares, Pulseras)
│   │       ├── ProductCard.tsx   # Tarjeta de renderizado individual de joya
│   │       ├── ProductGrid.tsx   # Cuadrícula responsiva de la tienda
│   │       ├── ProductRow.tsx    # Fila de producto para la tabla del administrador
│   │       ├── ProductsTable.tsx # Tabla de inventario del administrador
│   │       └── WishlistButton.tsx# Botón de favorito con forma de corazón minimalista
│   ├── config/
│   │   └── firebase.ts           # Inicialización y conexión del cliente de Firebase
│   ├── contexts/
│   │   ├── auth/                 # Contexto, Proveedor y Tipos de Autenticación
│   │   ├── cart/                 # Reductor, Proveedor y Tipos de la Bolsa de Compras
│   │   ├── orders/               # Contexto, Proveedor y Tipos de Pedidos
│   │   ├── products/             # Contexto y Proveedor del Catálogo
│   │   └── wishlist/             # Contexto y Proveedor de Favoritos
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook seguro para accesos de usuario
│   │   ├── useCart.ts            # Hook seguro para la bolsa de compras
│   │   ├── useDebounce.ts        # Hook de retraso de consulta para el buscador (400ms)
│   │   ├── useOrders.ts          # Hook seguro para historial de pedidos
│   │   ├── useProducts.ts        # Hook seguro para catálogo e inventario
│   │   └── useWishlist.ts        # Hook seguro para lista de deseos
│   ├── pages/
│   │   ├── AdminOrderPage.tsx    # Visualización y control de estado de pedidos para el admin
│   │   ├── AdminProductPage.tsx  # Panel de control de inventario de joyas del admin
│   │   ├── CartPage.tsx          # Resumen de bolsa de compras del cliente
│   │   ├── CatalogPage.tsx       # Vitrina pública de ventas
│   │   ├── CheckoutPage.tsx      # Confirmación y pago protegido contra doble submit
│   │   ├── LoginPage.tsx         # Pantalla de acceso centrada y minimalista
│   │   ├── OrderSuccessPage.tsx  # Confirmación de compra exitosa con ID de orden
│   │   ├── ProductFormPage.tsx   # Formulario único de creación/edición con carga a S3
│   │   ├── SignupPage.tsx        # Pantalla de registro de usuarios
│   │   └── WishlistPage.tsx      # Cuadrícula de joyas favoritas del cliente
│   ├── routes/
│   │   ├── AdminRoute.tsx        # Guard de seguridad exclusivo para rol administrador
│   │   └── ProtectedRoute.tsx    # Guard de seguridad para clientes autenticados
│   ├── services/
│   │   ├── auth.service.ts       # Comunicación directa con Firebase Auth y perfiles
│   │   ├── authError.service.ts  # Traductor y mapeo amigable de errores de Firebase Auth
│   │   ├── order.service.ts      # Registro y consulta de pedidos en Firestore (Batch Writes)
│   │   ├── products.service.ts   # CRUD de catálogo en Firestore
│   │   └── upload.service.ts     # Orquestación de subida binaria segura a AWS S3
│   ├── styles/
│   │   ├── adminPage.css         # Estilos encapsulados de administración
│   │   ├── authForm.css          # Estilos de tarjetas de acceso y registro
│   │   ├── cartPage.css          # Estilos de la tabla de la bolsa de compras
│   │   ├── catalogPage.css       # Estilos de la cuadrícula y las tarjetas arqueadas
```

---

## 4. Instrucciones de Instalación y Configuración Paso a Paso

Sigue esta guía detallada para clonar, configurar e iniciar el proyecto en tu entorno de desarrollo local desde cero:

### Paso 1: Clonar e Instalar Dependencias

```bash
# Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO_AQUI>
cd ecommerce-app

# Instalar los paquetes requeridos por el sistema
npm install
```

### Paso 2: Configurar Firebase (Auth y Firestore)

1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto nuevo.
2. Habilita **Authentication** y activa los proveedores de **Correo/Contraseña** y **Google**.
3. Habilita **Cloud Firestore** en modo de prueba y crea dos colecciones principales: `products` y `users`.
4. Ve a la configuración de tu proyecto (icono de engranaje) y copia tus credenciales del cliente de Firebase.

### Paso 3: Configurar AWS S3 (Bucket, CORS e IAM)

1. Abre tu consola web de AWS e ingresa al servicio de S3. Crea un bucket nuevo.
2. Desactiva la casilla "Bloquear todo el acceso público" para permitir que los clientes lean las fotos de tus joyas.
3. En la pestaña de **Permissions**, desplázate hasta **CORS (Cross-origin resource sharing)** y pega la siguiente configuración para autorizar subidas locales y desde tu futuro deploy:

```json
[
  {
    "AllowedHeaders": ["Content-Type"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

4. Ve al servicio de **IAM -> Users -> Create user**. Nómbralo `s3-uploader`.
5. En la sección de permisos, selecciona "Attach policies directly" y marca la casilla de **AmazonS3FullAccess**.
6. Una vez creado el usuario, entra a su pestaña de **Security credentials** y haz clic en **Create access key** seleccionando "Application running outside AWS". Copia de inmediato la **Access Key ID** y la **Secret Access Key** (solo se muestran esta vez).

### Paso 4: Crear el Archivo de Variables de Entorno

Crea un archivo llamado `.env` en la raíz de tu proyecto basándote en el archivo de plantilla `.env.example` del repositorio:

```properties
# Credenciales del Cliente de Firebase
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui

# Credenciales de Servidor para AWS S3 (Vercel Functions)
AWS_ACCESS_KEY_ID_VAL=tu_access_key_id_de_AWS_aqui
AWS_SECRET_ACCESS_KEY_VAL=tu_secret_access_key_de_AWS_aqui
AWS_REGION_NAME=us-east-1
AWS_S3_BUCKET_NAME=el_nombre_de_tu_bucket_de_S3_aqui
```

### Paso 5: Poblar la Base de Datos (Database Seeding)

Ejecuta el script de sembrado automático desde tu terminal para cargar de un solo golpe tus 60 productos de alta joyería clasificados con descripciones de lujo e imágenes de alta definición:

```bash
npx ts-node scripts/seed.ts
```

### Paso 6: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` y disfruta de tu boutique de joyería fina completamente operativa.

---

## 5. Flujo de Carga de Imágenes Seguro (Presigned URLs)

La carga de archivos físicos del administrador hacia AWS S3 se realiza bajo un flujo de alta seguridad técnica que sigue la siguiente secuencia:

```text
[ Admin (React) ]              [ Vercel Serverless ]             [ AWS S3 Bucket ]
          |                               |                                |
          |--- 1. Enviar Nombre/Tipo ---->|                                |
          |    de archivo (POST)          |                                |
          |                               |--- 2. Solicitar firma -------->|
          |                               |<-- 3. Retornar URL Firmada ----|
          |<-- 4. Devolver URL Firmada ---|                                |
          |      y ruta pública           |                                |
          |                                                                |
          |-------------------- 5. Subir archivo binario (PUT) ----------->|
          |<------------------- 6. Respuesta HTTP 200 (Éxito) -------------|
          |
          |--- 7. Guardar ruta pública en Firestore (getProductsService) ---> [ Firestore ]
```

---

## 6. Bitácora de Uso de IA: 5 Momentos Clave del Desarrollo

| # | Prompt Real Utilizado | Aprendizaje / Reflexión sobre la Respuesta | Decisión Técnica Resultante |
|---|-----------------------|--------------------------------------------|-----------------------------|
| **1** | "¿Cómo estructurar mi proyecto integrador en una arquitectura de capas limpia utilizando React, TypeScript y Firebase?" | Aprendí la importancia de desacoplar el componente visual de React de la llamada directa del SDK de Firebase. Entendí que la UI solo debe renderizar y que las llamadas externas deben encapsularse en una capa pura de servicios (`services/`). | Diseñé una arquitectura donde mis vistas (`pages/`) y mis contextos consumen servicios independientes (`products.service.ts`), manteniendo el código TSX corto y fácil de testear. |
| **2** | "Estoy teniendo un error de permisos Missing or insufficient permissions en Firestore al intentar verificar si mi usuario es administrador mediante get() en mi regla." | Descubrí que si un usuario inicia sesión pero aún no tiene un perfil creado en la colección users de Firestore, la consulta `get()` en las reglas del servidor colapsa por intentar leer un recurso nulo, arrojando un error de permisos denegados de forma masiva. | Diseñé una regla con el método `exists()`, asegurando que Firestore primero verifique la existencia física del perfil antes de evaluar el campo `.role`, evitando caídas del sistema. |
| **3** | "¿Cuándo deberia usar useReducer en lugar de useState simple para un carrito de compras y cómo se asocia a Context API?" | Entendí que el carrito tiene estados altamente dependientes: agregar un producto altera subtotales, cantidades, sumas totales y decrementos de stock. `useReducer` unifica estas instrucciones en un solo punto matemático libre de efectos secundarios. | Implementé un `cartReducer` puro e inmutable, acoplándolo con inicialización diferida (Lazy) para sincronizar de forma reactiva y guardar compras en `localStorage`. |
| **4** | "¿Por qué es una mala práctica guardar solo el ID del producto en un documento de orden de compra histórica en e-commerce?" | Comprendí el concepto de Snapshot Inmutable. Si un administrador edita el precio de una joya mañana o la borra, la orden del cliente no debe alterarse. La orden debe capturar una "fotografía" con el precio histórico de compra (`priceAtPurchase`). | Estructuré el modelo de datos de mi servicio de órdenes (`order.service.ts`) para duplicar de forma estática los campos `name` y `priceAtPurchase` en el momento exacto del checkout. |
| **5** | "Mi test de Vitest para useCart.test.ts me arroja error TS1294: 'This syntax is not allowed when erasableSyntaxOnly is enabled' en las etiquetas del Provider." | Comprendí de forma muy clara el sistema de compilación de TypeScript: cualquier archivo que contenga etiquetas XML/HTML (JSX) debe tener obligatoriamente la extensión `.tsx` en lugar de `.ts`. De lo contrario, el compilador confunde los corchetes `<` con operadores matemáticos de menor que. | Renombré el archivo de prueba a `useCart.test.tsx` de forma modular y se apagaron de golpe todos los errores sintácticos de mi terminal de pruebas. |

---

## 7. Guía de Ejecución de Pruebas (Vitest & React Testing Library)

El proyecto incluye una suite mínima de pruebas automatizadas enfocadas en comportamiento de negocio:
*   `cart.reducer.test.ts`: Pruebas de lógica pura (Inmutabilidad, vaciado y cantidades de la bolsa).
*   `useCart.test.tsx`: Pruebas del hook aislado usando `renderHook` y `act`.
*   `ProductCard.test.tsx`: Pruebas de renderizado de la UI de joyería fina y validación del botón de compra deshabilitado ante stock: 0.
*   `flow.test.tsx`: Prueba integrada del Checkout de compras usando el simulador MSW.

Para correr las pruebas de forma determinista localmente, ejecuta en tu terminal:

```bash
npx vitest run
```
