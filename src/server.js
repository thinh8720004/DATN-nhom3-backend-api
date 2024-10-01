import express from 'express';
import products from './routes/product.js';

const app = express();

// Sử dụng router cho các route bắt đầu bằng /api/v1
app.use('/api/v1', products);

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
