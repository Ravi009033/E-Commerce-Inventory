# E-Commerce-Inventory-System
A simple E-commerce system built with Node.js (Express), MongoDB, React.
Supports products, categories, orders, stock management, and frontend catalog with search/filter.

## ⚙️ Setup Instructions

### 1. Clone Repository
```
git clone https://github.com/Ravi009033/E-Commerce-Inventory.git
cd E-commerce-Inventory
```
### 2. Backend Setup
```
cd backend
npm install
```
- Create .env inside /backend:
```
MONGO_URI="mongodb+srv://ecommerce_user_db:your-password@cluster0.yhjmpbu.mongodb.net/Ecommerce"
PORT = 5000
NODE_ENV = development
```
- Run the backend:
```
npm run dev
```
- Establish a connection to your MongoDB database:
```
npm install mongoose
```
- Backend runs at: http://localhost:5000
  
### 3. Frontend Setup
```
cd frontend
npm install
npm start
```
- Frontend runs at: http://localhost:3000

## 📌 API Documentation
### Product Management
- POST /api/products → Create a new product
```
{
  "name": "iPhone 14 Pro",
  "sku": "MOB-IPHONE14-PRO",
  "price": 120000,
  "stock_quantity": 25,
  "category_id": "66d1112c90ab5678cdef1234"
}
```
- GET /api/orders/:id - Get order details
- PUT /api/products/:id → Update product details
- GET /api/products/low-stock → Get products with stock < 10

### Order Management 
- POST /api/orders → Create a new order
```
{
  "user_id": "USER123",
  "items": [
    { "product_id": "68b42e3f660ec9f832835b46", "quantity": 2 }
  ]
}
```
- GET /api/orders/:id → Get order details
- PUT /api/orders/:id/status → Update order status
- GET /api/users/:id/orders → Get user's order history

### Stock Management
- PUT /api/products/:id/stock → Update stock manually
- POST /api/orders/:id/fulfill → Mark order as fulfilled

### Categories
- GET /api/categories → List all categories
- POST /api/categories → Create a new category
```
{
  "name": "Electronics",
  "description": "Devices and gadgets including TVs, laptops, and accessories"
}
```

## 🏗️ Architecture Notes

### Backend:
- Built with Node.js + Express + MongoDB.
- Models: Product, Category, Order, OrderItem.
- Used Mongoose transactions to ensure stock consistency (no overselling).
- price_at_time stored in OrderItem → keeps historical prices even if product price changes later.
- Stock is reduced at order creation and restored if the order is cancelled.
- low stock alerts (in-stock, low-stock, out-of-stock)

### Frontend:
- React app with Context API for Cart, CSS for styling.
- Product catalog supports:
  - ✅ Stock levels (In Stock, Low Stock, Out of Stock)
  - ✅ Search by name
  - ✅ Filter by category
  - ✅ Add to cart
- Cart (checkout → create order)
- Orders (view history + statuses)

### Design Decisions:
- Transactions for Orders → avoid race conditions when multiple users purchase the same product.
- Separate OrderItem model → avoids duplication of product data inside orders.
- Low Stock Alerts → improve business visibility into inventory.
- Scalability: can add caching (Redis), message queues (Kafka/RabbitMQ), JWT auth, and microservices in the future.
