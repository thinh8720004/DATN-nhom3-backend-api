import express from 'express'
import { getAllCategory } from '../controller/categoryController.js';

const categoryRouter = express.Router();

const initCategoryRouter = (app) => {
    categoryRouter.get('/category',getAllCategory);
    return app.use('/api/v1', categoryRouter); 
}
 

export default initCategoryRouter;
