import getConnection from "../config/db.js"; // Import kết nối pool hoặc connection
import {
  addProductService,
  deleteProductService,
  getAllProductService,
  getProductService,
  updateProductService,
} from "../services/productServices.js";
import  fs from "fs"
// const path = require('path');
import path from "path";

// lấy tất cả sản phẩm
export const getAllProduct = async (req, res) => {
  await getAllProductService(req, res);
  return res.send("GET ALL PRODUCTS OK");
};
// lấy 1 sp theo id
export const getProductById = async (req, res) => {
  const productId = req.params.id;
  // res.send(`Product ID is: ${productId}`);
  await getProductService(productId, req, res);
};
//add product
export const addProduct = async (req, res) => {
  await addProductService(req.body, req, res);
};

export const updateProduct = async (req, res) => {

 const data = await updateProductService(req.body, res)
}

export const deleteProduct = async (req, res) => {
  const data = await deleteProductService(req.body, res)
}


