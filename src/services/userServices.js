// import { resolve } from "path"

import bcrypt from "bcryptjs";
import getConnection from "../config/db.js";
const salt = bcrypt.genSaltSync(10); // hash password
import { getUserById } from '../controller/userController.js';

// Tạo tài khoản
export let createUserService = async (data,res) => {
  let abc = getUserById( res)
  console.log(abc)
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      const connection = await getConnection(); // Lấy kết nối từ pool
        if (!data.id||!data.name || !data.email || !hashPasswordFromBcrypt) {
            return res.status(200).json({
              message: "Chưa ĐIền Đầy ĐỦ thông tin"
             
            })
        }
      await connection.execute(
        "INSERT INTO `user` (`id`,`name`, `email`, `password`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?,NOW(), NOW())",
        [ data.id, data.name, data.email, hashPasswordFromBcrypt]
        );
        return res.status(200).json({
            message : "Đã Thêm User Thành Công"
        })
    } catch (e) {
      reject(e);
    }
  });
};

export let updateUserService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      const connection = await getConnection(); // Lấy kết nối từ pool

      // Sử dụng connection.execute để thực hiện truy vấn
      const [result] = await connection.execute(
          "UPDATE `user` SET `name` = ?, `email` = ?, `password` = ?, `updated_at` = NOW() WHERE `id` = ?",
          [data.name, data.email, hashPasswordFromBcrypt, data.id]
      );

      // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng
      if (result.affectedRows === 0) {
          return reject(new Error("Người dùng không tồn tại hoặc không thể cập nhật"));
      }

      resolve("Cập nhật người dùng thành công");
    } catch (e) {
      reject(e);
    }
  });
};

export let deleteUserService = async(data,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection(); // Lấy kết nối từ pool

      // Sử dụng connection.execute để thực hiện truy vấn
      const [result] = await connection.execute(
          "DELETE FROM `user`WHERE `id` = ?",
          [ data.id]
      );

      // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng
      if (result.affectedRows === 0) {
          return reject(new Error("Người dùng không tồn tại hoặc không thể cập nhật"));
      }

      resolve("Cập nhật người dùng thành công");
    } catch (e) {
      reject(e);
    }
  });
}




// hash password
export let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
        resolve(hashPassword);
        
    } catch (e) {
      reject(e);
    }
  });
};
