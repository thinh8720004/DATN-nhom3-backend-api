import express from 'express';
import {getAllProduct,getProductById} from '../controller/productController.js'
const routerProduct = express.Router();

const initProductRouter = (app) => {
    routerProduct.get('/product', getAllProduct); // get all products
    routerProduct.get('/product/:id', getProductById); // get product by id

    return app.use('/api/v1', routerProduct); // Added '/' before 'api/v1'
};

export default initProductRouter;
