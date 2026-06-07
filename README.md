# 🍕 Foody - Food Delivery & Restaurant Management Platform

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.3-green?logo=spring)
![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack web-based food delivery and restaurant management platform built with **React** and **Spring Boot**. Foody enables customers to order food from multiple restaurants, while restaurant owners can manage their menus, orders, and operations efficiently. The platform includes admin dashboards for super-admins and advanced payment integration.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Installation & Running](#-installation--running)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [Payment Integration](#-payment-integration)

---

## ✨ Features

### 👥 Customer Features
- User Authentication with JWT
- Browse Restaurants with filters
- View detailed menus with ingredients
- Shopping Cart with real-time calculations
- Easy checkout process
- Order Tracking & History
- Save Favorite restaurants
- User Profile Management
- Ratings & Reviews

### 🏪 Restaurant Owner Features
- Comprehensive Dashboard
- Menu Management (CRUD operations)
- Category Management
- Order Management in real-time
- Ingredient Tracking
- Restaurant Settings
- Performance Analytics
- Event Management

### 👨‍💼 Super Admin Features
- User Management
- Restaurant Approval/Rejection
- Restaurant Monitoring
- Customer Management
- System-wide Analytics

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI Framework
- **Redux** 4.2.1 - State Management
- **Redux Thunk** 2.4.2 - Async Actions
- **React Router** 6.15.0 - Navigation
- **Material-UI** 5.14.6 - Components
- **Tailwind CSS** - Utility CSS
- **Axios** 1.7.2 - HTTP Client
- **Formik** 2.4.4 - Form Management
- **Yup** 1.2.0 - Validation

### Backend
- **Spring Boot** 3.1.3 - Framework
- **Java** 17 - Language
- **Spring Data JPA** - Database
- **Spring Security** - Authentication
- **MySQL** 5.7+ - Database
- **JWT** 0.11.1 - Token Auth
- **Stripe** 20.62.0 - Payments
- **Razorpay** 1.4.3 - Payments (India)
- **Cloudinary** - Image Upload

---

## 📁 Project Structure

### Frontend
```
frontend/
├── public/
├── src/
│   ├── Admin/              # Admin dashboard
│   ├── SuperAdmin/         # Super admin features
│   ├── customers/          # Customer components & pages
│   ├── State/              # Redux store
│   ├── Routers/            # Route configurations
│   ├── config/             # API config
│   ├── theme/              # Theme settings
│   └── App.js
├── tailwind.config.js
└── package.json
```

### Backend
```
backend/
├── src/main/java/com/zosh/
│   ├── config/            # Spring configuration
│   ├── controller/        # REST API endpoints
│   ├── service/           # Business logic
│   ├── repository/        # Data access
│   ├── model/             # Entities
│   ├── dto/               # Data Transfer Objects
│   ├── Exception/         # Custom exceptions
│   └── ZoshFoodApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

---

## 🚀 Getting Started

### Prerequisites

**Frontend:**
- Node.js v16.0.0+
- npm v8.0.0+ or yarn

**Backend:**
- Java 17 (JDK 17+)
- Maven 3.8.0+
- MySQL 5.7+

---

## 📥 Installation & Running

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/yourusername/foody.git
cd foody/frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_BASE_URL=http://localhost:8080/api" > .env
echo "REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_name" >> .env

# Start development server
npm start
```

Frontend runs on: `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend
cd foody/backend

# Create MySQL database
mysql -u root -p
CREATE DATABASE foody_db;
EXIT;

# Update application.properties
# Edit src/main/resources/application.properties with:
# spring.datasource.url=jdbc:mysql://localhost:3306/foody_db
# spring.datasource.username=root
# spring.datasource.password=your_password

# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

---

## 📖 API Documentation

### Authentication
```
POST   /api/auth/register              - Register user
POST   /api/auth/login                 - Login user
POST   /api/auth/logout                - Logout user
POST   /api/auth/refresh-token         - Refresh token
```

### Restaurants
```
GET    /api/restaurants                - Get all restaurants
GET    /api/restaurants/{id}           - Get restaurant details
POST   /api/restaurants                - Create restaurant (Admin)
PUT    /api/restaurants/{id}           - Update restaurant
DELETE /api/restaurants/{id}           - Delete restaurant
```

### Food/Menu
```
GET    /api/food                       - Get all food items
GET    /api/food/{id}                  - Get food details
POST   /api/food                       - Create food item
PUT    /api/food/{id}                  - Update food item
DELETE /api/food/{id}                  - Delete food item
GET    /api/categories                 - Get categories
```

### Orders
```
GET    /api/orders                     - Get user orders
POST   /api/orders                     - Create order
GET    /api/orders/{id}                - Get order details
PUT    /api/orders/{id}                - Update order status
GET    /api/admin/orders               - Admin: Get all orders
```

### Users
```
GET    /api/users/profile              - Get profile
PUT    /api/users/profile              - Update profile
POST   /api/users/addresses            - Add address
GET    /api/users/addresses            - Get addresses
DELETE /api/users/addresses/{id}       - Delete address
```

### Payments
```
POST   /api/payments/stripe            - Stripe payment
POST   /api/payments/razorpay          - Razorpay payment
POST   /api/payments/webhook           - Payment webhook
```

---

## 🗄️ Database Schema

### User
- ID, Full Name, Email, Password, Phone, Role, Addresses, Favorites, Orders

### Restaurant
- ID, Name, Description, Cuisine, Address, Contact, Hours, Ratings, Image, Owner, Menu Items

### Food/Menu Item
- ID, Name, Description, Price, Image, Category, Restaurant, Ingredients, Availability

### Order
- ID, Customer, Restaurant, Items, Total Amount, Status, Delivery Address, Payment

### Order Item
- ID, Food Item, Quantity, Subtotal, Order

### Payment
- ID, Order, Amount, Method, Status, Transaction ID, Timestamp

### Category
- ID, Name

### Address
- ID, Street, City, State, Postal Code, Country

---

## 🔐 Authentication & Security

### JWT Authentication
- Token-based authentication
- Access Token (15 min expiry)
- Refresh Token (7 days expiry)
- HTTP-only, Secure cookies

### Password Security
- BCrypt hashing
- Strong password requirements
- Secure password reset

### Authorization
- Role-based Access Control (RBAC)
- Roles: CUSTOMER, RESTAURANT_OWNER, SUPER_ADMIN
- Protected API endpoints

---

## 💳 Payment Integration

### Stripe
- International card payments
- Webhook handling
- PCI DSS compliant

### Razorpay
- Indian market support
- Multiple payment methods (Cards, UPI, Wallets)
- Recurring payments

### Payment Flow
1. User initiates checkout
2. Payment gateway loads
3. User completes payment
4. Webhook confirms payment
5. Order status updated
6. Confirmation email sent

---

## 🏗️ Architecture

### Three-Tier Architecture
```
Frontend (React)
      ↓
   REST API
      ↓
Backend (Spring Boot)
      ↓
Database (MySQL)
```

### Design Patterns
- MVC (Model-View-Controller)
- Repository Pattern
- Service Layer Pattern
- DTO (Data Transfer Object)
- Dependency Injection
- Factory Pattern

---

## 📝 Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Backend (application.properties)
```
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/foody_db
spring.datasource.username=root
spring.datasource.password=password

# JWT
jwt.secret=your_jwt_secret_key
jwt.expiration=900000

# Stripe
stripe.api.key=your_stripe_key
stripe.webhook.secret=your_webhook_secret

# Razorpay
razorpay.key.id=your_key_id
razorpay.key.secret=your_key_secret

# Cloudinary
cloudinary.cloud.name=your_cloud_name
cloudinary.api.key=your_api_key
cloudinary.api.secret=your_api_secret

# Email
mail.from=noreply@foody.com
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email
spring.mail.password=your_password
```

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
mvn test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 🗺️ Roadmap

- [ ] WebSocket for real-time updates
- [ ] Delivery executive system
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Loyalty program
- [ ] AI recommendations
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Offline mode

---

## ❓ FAQ

**Q: What payment methods are supported?**
A: Stripe (international) and Razorpay (India - Cards, UPI, Wallets)

**Q: How are images handled?**
A: Images uploaded to Cloudinary, URLs stored in database

**Q: Is this production-ready?**
A: Production deployment recommended after security review

**Q: Can I deploy on cloud?**
A: Yes - AWS, Azure, Google Cloud, Heroku all supported

---

## 📞 Support

- Issues: Open GitHub issue
- Email: support@foody.com
- Documentation: Check wiki for guides

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- Spring Boot & Spring Security
- React & Redux
- Material-UI
- Stripe & Razorpay
- Cloudinary
- All contributors

---

## 👨‍💻 Developer

**Your Name** - Full Stack Developer

---

**Version**: 1.0.0
**Last Updated**: June 2026

---

Made with ❤️ by Foody Team

[⭐ Star](#) | [🐛 Report Bug](#) | [💡 Request Feature](#)
