# 🛒 Modern E-Commerce Platform

A full-stack e-commerce web application built with React, Node.js, Express, and MongoDB. This project demonstrates a complete online shopping experience with user authentication, product management, shopping cart functionality, and secure payment processing.

## 🚀 Features

### Frontend Features
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **User Authentication** - Secure login and registration system
- **Product Catalog** - Browse products by categories and filters
- **Product Search** - Real-time search functionality
- **Shopping Cart** - Add, remove, and modify cart items
- **User Profile** - Manage personal information and order history
- **Checkout Process** - Secure payment integration with Stripe
- **Admin Panel** - Product management for administrators

### Backend Features  
- **RESTful API** - Clean API architecture following REST principles
- **User Authentication** - Session-based authentication with secure cookies
- **Database Management** - MongoDB with Mongoose ODM
- **Payment Processing** - Stripe integration for secure transactions
- **Admin Controls** - CRUD operations for product management
- **Session Management** - Express-session for maintaining user state
- **CORS Support** - Cross-origin resource sharing configuration

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router DOM** - Declarative routing for React applications
- **React Icons** - Popular icon library for React
- **React Slick** - Carousel component for product showcases
- **ESLint** - Code linting for maintaining code quality

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **Stripe** - Payment processing platform
- **Express Session** - Session middleware for Express
- **CORS** - Cross-Origin Resource Sharing middleware
- **Cookie Parser** - Parse Cookie header and populate req.cookies
- **Dotenv** - Load environment variables from .env file

### Development Tools
- **Nodemon** - Automatic server restart during development
- **ESLint** - JavaScript linter for code quality
- **Vite** - Frontend build tool with hot module replacement

## 📁 Project Structure

```
ecommerce/
├── client/                      # Frontend React application
│   └── my-react-app/
│       ├── public/              # Static assets
│       ├── src/
│       │   ├── assets/          # Images and static files
│       │   │   ├── bygender/    # Gender-based category images
│       │   │   ├── database-files/  # Sample data files
│       │   │   ├── leaderboard/ # Featured product images
│       │   │   ├── logo/        # Brand logos
│       │   │   ├── shopbycategory/  # Category images
│       │   │   └── trending/    # Trending product images
│       │   ├── components/      # Reusable React components
│       │   │   ├── CartContext.jsx     # Shopping cart context
│       │   │   ├── header.jsx          # Navigation header
│       │   │   ├── footer.jsx          # Site footer
│       │   │   ├── ProductCard.jsx     # Product display component
│       │   │   ├── SearchResults.jsx   # Search functionality
│       │   │   └── ...                 # Other UI components
│       │   └── pages/           # Page components
│       │       ├── LandingPage.jsx     # Homepage
│       │       ├── ProductListing.jsx  # Product catalog
│       │       ├── ProductDetails.jsx  # Individual product page
│       │       ├── Cart.jsx            # Shopping cart
│       │       ├── Checkout.jsx        # Payment process
│       │       ├── Login.jsx           # User authentication
│       │       ├── AdminProducts.jsx   # Admin panel
│       │       └── ...                 # Other pages
│       ├── package.json         # Frontend dependencies
│       └── vite.config.js       # Vite configuration
│
└── server/                      # Backend Node.js application
    ├── db/                      # Database configuration
    │   ├── main.js             # MongoDB connection setup
    │   └── products.js         # Product data operations
    ├── middleware/              # Express middleware
    │   └── requireAuth.js      # Authentication middleware
    ├── models/                  # Database models (Mongoose schemas)
    │   ├── User.js             # User account model
    │   ├── Product.js          # Product catalog model
    │   ├── Cart.js             # Shopping cart model
    │   ├── Discount.js         # Discount/coupon model
    │   └── UserProfile.js      # User profile model
    ├── routes/                  # API route handlers
    │   ├── user.js             # User authentication routes
    │   ├── products.js         # Product CRUD operations
    │   ├── cart.js             # Shopping cart operations
    │   ├── checkout.js         # Payment processing
    │   ├── adminProducts.js    # Admin product management
    │   ├── profile.js          # User profile management
    │   └── ...                 # Other API routes
    ├── .env                    # Environment variables
    ├── package.json            # Backend dependencies
    └── server.js               # Main server entry point
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file with the following variables:
# MONGODB_URI=your_mongodb_connection_string
# SESSION_SECRET=your_session_secret
# STRIPE_SECRET_KEY=your_stripe_secret_key
# PORT=3000

npm start
# Server will run on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd client/my-react-app
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

## 🚦 API Endpoints

### Authentication Routes
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login  
- `POST /api/users/logout` - User logout

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search/:query` - Search products

### Cart Routes  
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Admin Routes
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Checkout Routes
- `POST /api/checkout/create-payment-intent` - Create Stripe payment intent
- `POST /api/checkout/confirm` - Confirm order

## 💳 Payment Integration

This application uses **Stripe** for secure payment processing:

1. **Payment Intent Creation** - Server creates payment intent with order details
2. **Client-Side Processing** - React frontend handles payment form
3. **Secure Transaction** - Stripe processes payment securely
4. **Order Confirmation** - Success/failure handling and order storage

## 👤 User Authentication

- **Session-based Authentication** using Express Session
- **Secure Password Handling** with proper hashing
- **Protected Routes** requiring authentication
- **Role-based Access** (Admin/Customer permissions)

## 🎨 Frontend Architecture

### Component Structure
- **Pages** - Full page components with routing
- **Components** - Reusable UI components
- **Context** - React Context for global state management
- **Assets** - Static files organized by category

### Styling Approach
- **CSS Modules** - Component-scoped styling
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean and intuitive interface

## 📊 Database Schema

### User Model
- Personal information
- Authentication credentials  
- Order history
- Profile preferences

### Product Model
- Product details and specifications
- Pricing and inventory
- Category and tags
- Images and media

### Cart Model
- User association
- Product items and quantities
- Session management

## 🔐 Security Features

- **Environment Variables** for sensitive data
- **CORS Configuration** for cross-origin requests
- **Session Management** with secure cookies
- **Input Validation** on both frontend and backend
- **Secure Payment Processing** through Stripe

## 🚀 Deployment

This project is configured for easy deployment using a monorepo approach. Both frontend and backend can be deployed from a single repository.

### Quick Deploy

**Recommended Stack:**
- **Frontend**: Vercel (Free tier)
- **Backend**: Render (Free tier)
- **Database**: MongoDB Atlas (Free tier)

### Deployment Files Included

- `vercel.json` - Vercel configuration for frontend
- `render.yaml` - Render configuration for backend
- `.env.example` - Template for environment variables
- `DEPLOYMENT.md` - Complete step-by-step deployment guide

### Environment Configuration

The project uses centralized API configuration that automatically switches between development and production:

**Development:**
```bash
# Frontend connects to local backend
VITE_API_URL=http://localhost:5001
```

**Production:**
```bash
# Frontend connects to deployed backend
VITE_API_URL=https://your-backend-url.onrender.com
```

### Deployment Steps

1. **Deploy Backend to Render**
   - Root directory: `server`
   - Environment: Node
   - Add environment variables from `.env.example`

2. **Deploy Frontend to Vercel**
   - Root directory: `client/my-react-app`
   - Framework: Vite
   - Add `VITE_API_URL` with your backend URL

3. **Update CORS**
   - Add your Vercel URL to `CLIENT_URL` in Render

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Health Check

After deployment, verify backend health:
```
GET https://your-backend-url.onrender.com/health
```

### Development
- Frontend: `npm run dev` (Vite dev server on port 5173)
- Backend: `npm start` (Node.js server on port 5001)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of CS360 coursework at the University of Idaho.

## 📞 Support

For questions or support, please contact the development team or refer to the project documentation.

---

**Built with ❤️ using modern web technologies**
