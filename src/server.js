import express from 'express';
import initProductRouter from './routes/product.js';
import initUserRouter from './routes/user.js';
import initCategoryRouter from './routes/category.js';

const app = express();

// Sử dụng router cho các route bắt đầu bằng /api/v1
// app.use('/api/v1');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const port = 8080;
initProductRouter(app)
initUserRouter(app)
initCategoryRouter(app)
app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
