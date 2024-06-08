# Product Catalog API

This repository contains a Node.js application that provides a RESTful API for managing a product catalog. The API supports operations for creating, reading, updating, and deleting products, as well as loading an initial set of products into the catalog.

## Features

- Get all products
- Get product by ID
- Create a new product
- Update a product
- Delete a product
- Load catalog

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/product-catalog-api.git
   cd product-catalog-api
   ```

2. Create a `.env` file with your database configuration:

   ```bash
   cp .env.example .env
   ```

3. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker image and start the application along with a PostgreSQL database.

### API Endpoints

- **GET /products**: Retrieve all products.
- **GET /products/{id}**: Retrieve a product by ID.
- **POST /products**: Create a new product.
- **PUT /products/{id}**: Update an existing product by ID.
- **DELETE /products/{id}**: Delete a product by ID.
- **POST /load_catalog**: Load an initial set of products into the catalog.

### Example Request

**POST /load_catalog**

Request body:

```json
[
  {
    "id": 1,
    "title": "Samsung Galaxy S21",
    "price": 2200000,
    "description": "El Samsung Galaxy S21 presenta una pantalla AMOLED de 6.2 pulgadas y una potente cámara trasera triple de 64 megapíxeles, ofreciendo colores vivos y detalles nítidos en las imágenes. Es una opción ideal para aquellos que buscan un smartphone con una excelente calidad de visualización y fotografía.",
    "image": "https://i.ibb.co/yf7pMpT/samsung-s21.webp",
    "rating": 4.5
  },
  {
    "id": 2,
    "title": "iPhone 12",
    "price": 2300000,
    "description": "El iPhone 12 de Apple se distingue por su pantalla Super Retina XDR de 6.1 pulgadas y el formidable chip A14 Bionic. Esta combinación ofrece una experiencia visual extraordinaria, con colores vibrantes y detalles nítidos. Además, el potente rendimiento del chip A14 Bionic garantiza un funcionamiento fluido y una eficiencia energética notable, brindando una experiencia de usuario excepcional en todas las tareas, desde la navegación web hasta los juegos más exigentes.",
    "image": "https://i.ibb.co/9nvKNSB/iphone-12.webp",
    "rating": 4.7
  }
]
```
