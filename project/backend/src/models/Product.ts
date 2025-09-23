import mongoose, { Schema, Document } from 'mongoose';
import { Product as IProduct } from '../../shared/types';

interface ProductDocument extends IProduct, Document {}

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Electronics', 'Clothing', 'Accessories', 'Sports', 'Home']
  },
  images: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [ReviewSchema],
  discount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Calculate average rating
ProductSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return;
  }
  
  const totalRating = this.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
  this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
};

// Update stock status based on quantity
ProductSchema.pre('save', function(next) {
  this.inStock = this.stockQuantity > 0;
  next();
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);