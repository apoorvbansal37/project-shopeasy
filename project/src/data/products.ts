import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 16499,
    originalPrice: 20599,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    description: "Experience premium audio quality with our latest wireless headphones featuring active noise cancellation and 30-hour battery life.",
    features: ["Active Noise Cancellation", "30-hour Battery", "Premium Audio Quality", "Comfortable Fit"],
    inStock: true,
    discount: 20
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 24799,
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Electronics",
    rating: 4.6,
    reviews: 189,
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and waterproof design.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Waterproof", "Sleep Tracking"],
    inStock: true
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 2499,
    originalPrice: 3299,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Clothing",
    rating: 4.5,
    reviews: 156,
    description: "Comfortable and sustainable organic cotton t-shirt perfect for everyday wear.",
    features: ["100% Organic Cotton", "Eco-Friendly", "Comfortable Fit", "Durable"],
    inStock: true,
    discount: 25
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 107499,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Electronics",
    rating: 4.9,
    reviews: 92,
    description: "Capture stunning photos with this professional-grade camera featuring 24MP sensor and 4K video recording.",
    features: ["24MP Sensor", "4K Video", "Professional Quality", "Multiple Lenses Compatible"],
    inStock: true
  },
  {
    id: 5,
    name: "Luxury Handbag",
    price: 16499,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Accessories",
    rating: 4.7,
    reviews: 203,
    description: "Elegant luxury handbag crafted from premium leather with spacious interior and multiple compartments.",
    features: ["Premium Leather", "Multiple Compartments", "Elegant Design", "Durable Construction"],
    inStock: true
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 10749,
    originalPrice: 13199,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Sports",
    rating: 4.4,
    reviews: 287,
    description: "High-performance running shoes designed for comfort and durability during your workouts.",
    features: ["Cushioned Sole", "Breathable Material", "Lightweight", "Durable"],
    inStock: true,
    discount: 19
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 7449,
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Home",
    rating: 4.3,
    reviews: 165,
    description: "Brew perfect coffee every morning with this programmable coffee maker featuring multiple brew settings.",
    features: ["Programmable", "Multiple Brew Settings", "Auto-Shutoff", "Easy Clean"],
    inStock: true
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 3299,
    image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Sports",
    rating: 4.6,
    reviews: 134,
    description: "Premium yoga mat with excellent grip and cushioning for your yoga and fitness routines.",
    features: ["Non-Slip Surface", "Extra Cushioning", "Lightweight", "Easy to Clean"],
    inStock: false
  }
];

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Accessories",
  "Sports",
  "Home"
];