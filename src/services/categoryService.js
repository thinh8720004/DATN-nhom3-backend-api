import getConnection from "../config/db.js";


// create danh mục
export let createCategoryService = async (data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
          const connection = await getConnection(); // Lấy kết nối từ pool
          if ( !data.name|| !data.parent_id) {
            return res.status(400).json({
              message: "Chưa điền đầy đủ thông tin",
            });
          }
    
          const [rows] = await connection.execute(
            "SELECT * FROM `category` WHERE name = ? ",
            [data.name]
          );
    
          if (rows.length > 0) {
            return res.status(409).json({
              message: "Danh mục đã tồn tại"
            });
          }
    
          await connection.execute(
            "INSERT INTO `category` (`name`, `parent_id`,  `created_at`, `updated_at`) VALUES (?, ?,NOW(), NOW())",
            [ data.name, data.parent_id]
          );
    
          return res.status(201).json({
            message: "Đã thêm Category thành công",
          });
        } catch (e) {
          reject(e);
        }
      });
}

//get all danh mục

export let getAllCategoryService = async (req, res) => {
  try {
    const connection = await getConnection(); // Lấy kết nối từ pool

    const [results] = await connection.execute('SELECT * FROM `category`');
    
    // Trả về kết quả truy vấn dưới dạng JSON
    //   res.json(results);
        //   console.log(results)
        return res.status(200).json({
            message: 'ok',
            results
        })

    // Không cần connection.end() nếu bạn dùng connection pool
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
  }
}


//////////////////
export let editCategoryService = async (id, res) => {
  // res.status(200).send(data)
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection(); // Lấy kết nối từ pool
  
      const [results] = await connection.execute('SELECT * FROM `category` WHERE id = ?',[id]);
      
      // Trả về kết quả truy vấn dưới dạng JSON
      //   res.json(results);
          //   console.log(results)
          return res.status(200).json({
              message: 'ok',
              results
          })
  
      // Không cần connection.end() nếu bạn dùng connection pool
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
    }
    });
  
  // console.log(id)
}

// update category
export let updateCategoryService = async (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      const connection = await getConnection(); // Lấy kết nối từ pool
       // Sử dụng connection.execute để thực hiện truy vấn
       const [result] = await connection.execute(
        "UPDATE `category` SET `name` = ?, `parent_id` = ? , `updated_at` = NOW() WHERE `id` = ?",
        [data.name, data.parent_id, data.id]
      );

       // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng
      if (result.affectedRows === 0) {
        return reject(
          new Error("Người dùng không tồn tại hoặc không thể cập nhật")
        );
      }
      resolve("Cập nhật danh mục thành công");
    } catch (e) {
      reject(e);
    }
  })
}

export let deleleCategoryService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await getConnection(); // Lấy kết nối từ pool

      // Sử dụng connection.execute để thực hiện truy vấn
      const [result] = await connection.execute(
        "DELETE FROM `category`WHERE `id` = ?",
        [data.id]
      );

      // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng
      if (result.affectedRows === 0) {
        return reject(
          new Error("Danh mục  không tồn tại hoặc không thể cập nhật")
        );
      }

      resolve("Đã xoá danh mục thành công");
    } catch (e) {
      reject(e);
    }
  });
}

