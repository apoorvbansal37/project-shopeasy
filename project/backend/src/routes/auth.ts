import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User, { UserDocument } from '../models/User';
import { auth } from '../middleware/auth';
import { ApiResponse, LoginRequest, RegisterRequest } from '../shared/types';

const router = express.Router();

// =====================
// Register Route
// =====================
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, data: errors.array() } as ApiResponse<null>);
    }

    const { name, email, password } = req.body as RegisterRequest;

    try {
      const existingUser = await User.findOne({ email }) as UserDocument | null;
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' } as ApiResponse<null>);
      }

      const newUser = new User({ name, email, password });
      await newUser.save();

      return res
        .status(201)
        .json({ success: true, data: { userId: newUser._id } } as ApiResponse<{ userId: string }>);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: 'Server error' } as ApiResponse<null>);
    }
  }
);

// =====================
// Login Route
// =====================
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, data: errors.array() } as ApiResponse<null>);
    }

    const { email, password } = req.body as LoginRequest;

    try {
      const user = await User.findOne({ email }) as UserDocument | null;
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid credentials' } as ApiResponse<null>);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid credentials' } as ApiResponse<null>);
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
      });

      return res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
        },
      } as ApiResponse<{ token: string; user: any }>);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: 'Server error' } as ApiResponse<null>);
    }
  }
);

export default router;

