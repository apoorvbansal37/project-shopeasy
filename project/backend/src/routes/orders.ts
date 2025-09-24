import express from 'express';
const router = express.Router();

// Define order routes
router.get('/', (req, res) => {
  res.send('All orders');
});

export default router;   // <-- THIS IS IMPORTANT
