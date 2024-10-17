import getConnection from '../config/db.js';
import { createCategoryService, getAllCategoryService,editCategoryService, updateCategoryService, deleleCategoryService } from '../services/categoryService.js';
export const getAllCategory = async (req, res) => {
    await getAllCategoryService(req, res)
        
}

export const createCategory = async(req, res)=>{
    // const UserId = req.params.id;
    await createCategoryService(req.body,res)
    return res.send("Create Category")

}

export const geteditCategory = async(req, res)=>{
    const categoryId = req.params.id;
    await editCategoryService(categoryId,res)
    // return res.send(categoryId)

}

export const updateCategoryById = async(req, res)=>{
    try {
        const data = req.body;
        const result = await updateCategoryService(data);
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Đã xảy ra lỗi khi cập nhật người dùng",
        });
    }

}

export const deleteCategoryById = async(req, res)=>{

    const data = req.body
    await deleleCategoryService(data,res)
}

