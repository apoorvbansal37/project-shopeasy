import express from 'express';

const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'All products' });
});

export default router; // ✅ Important: makes this file a module
