require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initDb, query } = require('./services/db');
const { uploadObject } = require('./services/s3');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));
// Health check (ALB will call this)
app.get('/health', (req, res) => res.send('ok'));

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await query('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows || rows.length === 0) return res.status(404).send('Not found');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  const { user_name, user_email, items } = req.body;
  if (!items || !Array.isArray(items)) return res.status(400).send('Invalid items');

  const conn = await initDb();
  try {
    await conn.beginTransaction();
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_name, user_email, total) VALUES (?, ?, ?)',
      [user_name, user_email, total]
    );
    const orderId = orderResult.insertId;
    for (const it of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)',
        [orderId, it.product_id, it.qty, it.price]
      );
    }
    await conn.commit();
    res.json({ orderId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).send('error');
  } finally {
    conn.release();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
