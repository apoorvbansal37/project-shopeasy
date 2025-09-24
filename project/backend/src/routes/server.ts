import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
