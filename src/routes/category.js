import express from 'express'
import { createCategory, deleteCategoryById, getAllCategory,geteditCategory, updateCategoryById } from '../controller/categoryController.js';

const categoryRouter = express.Router();

const initCategoryRouter = (app) => {
    categoryRouter.get('/Allcategory', getAllCategory);
    categoryRouter.post('/create-category',createCategory )
    
    categoryRouter.get('/get-edit-category/:id',geteditCategory )
    categoryRouter.post('/updateCategory', updateCategoryById);  //update 
    categoryRouter.delete('/deleteCategory/', deleteCategoryById);  //dêtle 
  
    return app.use('/api/v1', categoryRouter); 
}
 

export default initCategoryRouter;
