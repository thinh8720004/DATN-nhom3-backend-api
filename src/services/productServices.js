import getConnection from "../config/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

export let getAllProductService = async (req, res) => {
  // console.log("Check OK")
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection(); // Đảm bảo bạn đợi kết nối hoàn tất
      const [results] = await connection.execute("SELECT * FROM `product`"); // Sử dụng dấu nháy ngược để bọc tên bảng

      return res.status(200).json({
        message: "ok",
        results,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export let getProductService = async (id, req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection();
      const results = connection.execute(
        "SELECT * FROM `product` WHERE `id` = ?",
        [id]
      );
      res.status(200).json({
        message: "okkkk",
        results: results,
      });
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  });
};

export let addProductService = async (data, req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection();
      const imageFiles = req.files;
      const {
        name,
        description,
        price,
        productionDate,
        expirationDate,
        category_id,
        isNew,
      } = req.body;
      const [results] = await connection.execute(
        "INSERT INTO `product`(`name`, `description`, `price`, `productionDate`, `expirationDate`, `category_id`, `isNew`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,NOW(),NOW())",
        [
          data.name,
          data.description,
          data.price,
          data.productionDate,
          data.expirationDate,
          data.category_id,
          data.isNew,
        ]
        );
                    const productId = results.insertId;
            console.log('Product ID:', productId);

      // Kiểm tra xem tệp tin có tồn tại hay không
      if (imageFiles && imageFiles.length > 0) {
        const imageInsertPromises = imageFiles.map((imageFile, index) => {
            const tempPath = imageFile.path; // Đường dẫn tạm của tệp tin
            const targetFilename = imageFile.filename; // Sử dụng tên file đã định nghĩa
            const targetPath = path.join(
                "D:/Backend_Nha_Thuoc/public/uploads/",
                targetFilename
            );
    
            return new Promise((resolve, reject) => {
                // Di chuyển tệp tin từ thư mục tạm sang thư mục đích
                fs.rename(tempPath, targetPath, (err) => {
                    if (err) {
                        console.error("Lỗi khi di chuyển file:", err);
                        reject(new Error("Lỗi khi lưu hình ảnh"));
                    } else {
                        const isMain = index === 0 ? 1 : 0; // Chọn hình ảnh đầu tiên làm hình chính
                        connection.execute(
                            "INSERT INTO `image`(`product_id`, `url`, `isMain`, `created_at`, `updated_at`) VALUES (?, ?, ?, NOW(), NOW())",
                            [productId, targetFilename, isMain]
                        ).then(resolve).catch(reject);
                    }
                });
            });
        });
    
// Thêm thông tin hình ảnh vào bảng image


      } else {
        return res
          .status(400)
          .json({ message: "Không có tệp tin hình ảnh nào được tải lên" });
      }
    } catch (error) {
      console.error("Lỗi trong addProductService:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  });
};

export const updateProductService = async (data, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = getConnection()
      const results = (await connection).execute("UPDATE `product` SET `name`= ? ,`description`=?,`price`=?,`productionDate`=?,`expirationDate`=?,`category_id`=?,`isNew`=?,`updated_at`= NOW() WHERE `id` = ? ", 
        [data.name , data.description, data.price,data.productionDate,data.expirationDate,data.category_id,data.isNew,data.id]
      )
     console.log(data)
      
      
    } catch (error) {
      console.log(error)
    }
  })
  
  
}

export const deleteProductService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kết nối tới cơ sở dữ liệu
      const connection = await getConnection(); // Đảm bảo hàm getConnection trả về kết nối MySQL kiểu promise
      
      // Thực hiện lệnh DELETE
      const [results] = await connection.execute("DELETE FROM `product` WHERE id = ?", [data.id]);
      
      // Trả về kết quả
      resolve(results);
      
    } catch (error) {
      console.log(error);
      reject(error); // Gửi lỗi nếu có xảy ra
    }
  });
};