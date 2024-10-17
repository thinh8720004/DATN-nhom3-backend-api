import express from 'express';
import initProductRouter from './routes/product.js';
import initUserRouter from './routes/user.js';
import initCategoryRouter from './routes/category.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// app.use(express.static(__dirname + './public'));


// Sử dụng router cho các route bắt đầu bằng /api/v1
// app.use('/api/v1');



app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


const port = 8080;
initProductRouter(app) // rputer product
initUserRouter(app) //router user
initCategoryRouter(app) // router category

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
