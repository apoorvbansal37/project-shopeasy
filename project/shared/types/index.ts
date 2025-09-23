// Shared types between frontend and backend

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  avatar?: string;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  features: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: Review[];
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  _id?: string;
  user: string | User;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id?: string;
  user: string | User;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  product: string | Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Category {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  features: string[];
  stockQuantity: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  inStock?: boolean;
}

export interface CreateOrderRequest {
  items: {
    product: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  paymentMethod: string;
}

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  orderId: string;
}