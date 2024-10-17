import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { addProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from '../controller/productController.js';
const __dirname = path.resolve(); 

const routerProduct = express.Router();

export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Sử dụng __dirname để đảm bảo lưu đúng trong thư mục của dự án
        cb(null, path.join(__dirname, '../public/uploads/'));
    },

    // Thêm lại phần mở rộng cho tệp tin
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const initProductRouter = (app) => {
    routerProduct.get('/product', getAllProduct); // get all products
    routerProduct.get('/productById/:id', getProductById); // get product by id

    // Thêm API mới để nhận form-data
    
    routerProduct.post('/add-product', upload.array('images', 3), addProduct);

    routerProduct.post('/updateProduct', updateProduct)// update

    routerProduct.delete('/deleteProduct',deleteProduct) //deleteProduct
   
    return app.use('/api/v1', routerProduct); // Added '/' before 'api/v1'
};

export default initProductRouter;
