# Complete E-commerce Application

A full-stack e-commerce application built with React (frontend) and Node.js/Express (backend).

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── shared/           # Shared types and utilities
└── README.md         # This file
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Features

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Payment**: Stripe integration ready
- **File Upload**: Multer for product images
- **Validation**: Joi for request validation
- **Security**: CORS, helmet, rate limiting

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `POST /api/payment/create-intent` - Create payment intent

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
npm start
```