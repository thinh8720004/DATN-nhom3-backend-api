// import { resolve } from "path"

import bcrypt from "bcryptjs";
import getConnection from "../config/db.js";
const salt = bcrypt.genSaltSync(10); // hash password

// Tạo tài khoản
export let createUserService = async (data, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      const connection = await getConnection(); // Lấy kết nối từ pool
      if (!data.id || !data.name || !data.email || !hashPasswordFromBcrypt || !data.phone) {
        return res.status(400).json({
          message: "Chưa điền đầy đủ thông tin",
        });
      }

      const [rows] = await connection.execute(
        "SELECT * FROM `user` WHERE email = ? OR phoneNumber = ?",
        [data.email, data.phone]
      );

      if (rows.length > 0) {
        return res.status(409).json({
          message: "Email hoặc số điện thoại đã tồn tại"
        });
      }

      await connection.execute(
        "INSERT INTO `user` (`id`,`name`, `email`, `password`, `phoneNumber`, `created_at`, `updated_at`) VALUES (?, ?, ?,?, ?,NOW(), NOW())",
        [data.id, data.name, data.email, hashPasswordFromBcrypt, data.phone]
      );

      return res.status(200).json({
        message: "Đã thêm User thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};


//get usser by id tp edit
export let getUserByIdService = async (id, res) => {
  return new Promise(async (resolve, reject) => {
    const connection = await getConnection();
    try {
      const [results] = await connection.execute(
        "SELECT * FROM `user` WHERE `id` = ?",
        [id]
      );
      
      if (results.length == 0) {
        res.send("ko thấy ")
      } else {
        resolve(results[0]);
      res.status(200).json({
        message: "ok", 
        results
      })
      }
      // console.log(results[0])
      
      
    } catch (error) {
      console.log(error)
    }
  });
};

//update
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
        return reject(
          new Error("Người dùng không tồn tại hoặc không thể cập nhật")
        );
      }

      resolve("Cập nhật người dùng thành công");
    } catch (e) {
      reject(e);
    }
  });
};
//delete
export let deleteUserService = async (data, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection(); // Lấy kết nối từ pool

      // Sử dụng connection.execute để thực hiện truy vấn
      const [result] = await connection.execute(
        "DELETE FROM `user`WHERE `id` = ?",
        [data.id]
      );

      // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng
      if (result.affectedRows === 0) {
        return reject(
          new Error("Người dùng không tồn tại hoặc không thể cập nhật")
        );
      }

      resolve("Cập nhật người dùng thành công");
    } catch (e) {
      reject(e);
    }
  });
};

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
