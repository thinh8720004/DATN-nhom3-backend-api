import express from 'express';
import { getProduct } from '../controller/product.js';  // Import controller

const routerProduct = express.Router();

// Định nghĩa route với tham chiếu tới hàm controller
routerProduct.get('/', getProduct);  // Chỉ tham chiếu, không gọi hàm

export default routerProduct;
