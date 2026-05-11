# 🥜 Nuts - Plataforma E-commerce Dietética

Nuts es una plataforma e-commerce desarrollada para la gestión y comercialización de productos de dietética.

El proyecto está compuesto por:

- Backend API REST
- Frontend Web App
- Base de datos en Firebase Firestore
- Autenticación JWT
- Documentación Swagger

La arquitectura fue pensada desde el inicio con foco en:

- escalabilidad
- mantenibilidad
- separación de responsabilidades
- performance
- experiencia de usuario

---

# 🧩 Stack tecnológico

## Backend

- Node.js
- Express.js
- Firebase Firestore
- JWT Authentication
- Swagger OpenAPI
- dotenv
- cors

---

## Frontend

- Next.js
- React
- TailwindCSS
- TanStack Query
- Zustand
- Zod
- Axios

---

# 🏗️ Arquitectura del proyecto

```bash
nuts_tienda/
│
├── backend/
│
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── docs/
│   └── data/
│
│   ├── scripts/
│   ├── app.js
│   ├── index.js
│   └── package.json
│
└── frontend/
    │
    ├── app/
    ├── components/
    ├── services/
    ├── store/
    ├── hooks/
    ├── schemas/
    ├── lib/
    └── package.json
```

---

# 🚀 Funcionalidades principales

## Backend

- CRUD completo de productos
- Persistencia real con Firestore
- JWT Authentication
- Roles admin/user
- Middleware de autorización
- Swagger Documentation
- Validaciones
- Arquitectura desacoplada

---

## Frontend

- Catálogo dinámico de productos
- Consumo de API REST
- Estado global con Zustand
- Fetching y cache con TanStack Query
- Formularios validados con Zod
- UI responsive
- Optimización de renderizado
- Arquitectura escalable

---

# 🔥 Backend

# 📦 Instalación

```bash
cd backend
npm install
```

---

# ⚙️ Variables de entorno

Crear archivo `.env`

```env
PORT=3000

JWT_SECRET=tu_secret

FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----\n"
```

---

# ▶️ Ejecutar backend

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

---

# 📚 Swagger

Disponible en:

```bash
http://localhost:3000/api/docs
```

---

# 🔐 Autenticación

La API utiliza JWT Bearer Token.

## Login

```http
POST /auth/login
```

---

# 👤 Roles

- admin
- user

---

# 📦 Endpoints principales

## Productos

```http
GET /api/products
GET /api/products/:id
POST /api/products/create
PUT /api/products/:id
DELETE /api/products/:id
```

---

# 🔥 Firestore

Colección principal:

```bash
products
```

---

# 🌱 Seeder

Migración automática de productos iniciales:

```bash
node scripts/seedProducts.js
```

---

# 💻 Frontend

# 📦 Instalación

```bash
cd frontend
npm install
```

---

# ▶️ Ejecutar frontend

```bash
npm run dev
```

---

# 🧠 Arquitectura Frontend

## TanStack Query

Se utiliza para:

- fetching
- cache
- sincronización server state
- invalidación automática
- optimización de requests

---

## Zustand

Se utiliza para:

- carrito
- usuario autenticado
- estados globales

---

## Zod

Validaciones tipadas para:

- formularios
- autenticación
- productos
- checkout

---

## TailwindCSS

Sistema de estilos utility-first para:

- responsive design
- escalabilidad visual
- consistencia UI

---

# 📁 Estructura Frontend

```bash
frontend/
│
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── store/
├── schemas/
├── types/
├── lib/
└── utils/
```

---

# 📈 Escalabilidad

El proyecto fue diseñado para permitir futuras integraciones:

- pasarela de pagos
- panel admin
- upload de imágenes
- filtros avanzados
- paginación
- favoritos
- órdenes de compra
- deploy cloud
- testing
- dockerización
- CI/CD

---

# 🛡️ Buenas prácticas implementadas

- separación por capas
- manejo centralizado de errores
- middlewares reutilizables
- validaciones
- arquitectura desacoplada
- componentes reutilizables
- tipado consistente
- manejo de estado optimizado

---

# 👩‍💻 Desarrollo

Proyecto desarrollado como práctica profesional fullstack orientada a e-commerce moderno y arquitectura escalable.

---

# 📄 Licencia

MIT