# Inventory Management System

A web-based Inventory Management System designed for small businesses to efficiently manage product stock levels. This system allows authorized users to perform CRUD operations on products, search and filter inventory, and view summary statistics on a dashboard.



## Features

* User Authentication with secure login (single role: Inventory Manager)
* Admin dashboard to view and manage users and their products
* Full CRUD operations for products with validation
* Unique product name and SKU enforcement
* Product listing with pagination, search by name, and category filtering
* Dashboard showing total number of products and total quantity in stock
* Responsive UI built with React.js
* RESTful API backend powered by Spring Boot
* API documentation via Swagger/OpenAPI


## Technology Stack

* **Backend**: Spring Boot (Java)
* **Frontend**: React.js
* **Database**: MySQL


## Getting Started

### Prerequisites

* Java JDK 11+
* Node.js & npm
* MySQL server

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Task/Success200/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Configure environment variables**

   Create `.env` files or set environment variables for sensitive info:

   ```
   DB_URL=jdbc:mysql://localhost:3306/inventory_db
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   ```

3. **Database**

   Create the MySQL database named `inventory_db` (or your chosen name).

4. **Run backend**

   * Using Maven

     ```bash
     cd backend
     mvn clean install
     mvn spring-boot:run
     ```

5. **Run frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

6. **Access**

   * Frontend UI: `http://localhost:3000`
   * API Swagger docs: `http://localhost:8080/swagger-ui.html`

---

## API Endpoints

| Method | Endpoint                  | Description                                |
| ------ | ------------------------- | ------------------------------------------ |
| POST   | `/api/auth/login`         | User login                                 |
| GET    | `/api/products`           | List products (supports search and filter) |
| POST   | `/api/products`           | Create new product                         |
| GET    | `/api/products/{id}`      | Get product details                        |
| PUT    | `/api/products/{id}`      | Update product info                        |
| DELETE | `/api/products/{id}`      | Delete product                             |
| GET    | `/api/dashboard`          | Get total products and quantity summary    |
| GET    | `/user/{userId}/products` | Admin fetches products for a selected user |

---

## Database Schema (Core)

| Field       | Type                  | Constraints      |
| ----------- | --------------------- | ---------------- |
| id          | INT (AUTO\_INCREMENT) | PRIMARY KEY      |
| name        | VARCHAR(100)          | UNIQUE, NOT NULL |
| sku         | VARCHAR(50)           | UNIQUE, NOT NULL |
| category    | VARCHAR(50)           | NULLABLE         |
| quantity    | INT                   | NOT NULL, >= 0   |
| price       | DECIMAL(10,2)         | NOT NULL, >= 0   |
| description | TEXT                  | NULLABLE         |

---

## Usage

* Register or login as the Inventory Manager user.
* Add new products ensuring unique names and SKUs.
* Edit or delete existing products as needed.
* Search and filter products using the product list page.
* Monitor stock levels and product counts through the dashboard.
