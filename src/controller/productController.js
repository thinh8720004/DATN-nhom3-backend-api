import getConnection from '../config/db.js';  // Import kết nối pool hoặc connection

// lấy tất cả sản phẩm
export const getAllProduct = async (req, res) => {
  // try {
  //   const connection = await getConnection(); // Lấy kết nối từ pool

  //   const [results] = await connection.query('SELECT * FROM `users`');
    
  //   // Trả về kết quả truy vấn dưới dạng JSON
  //     res.json(results);
  //     console.log(results)

  //   // Không cần connection.end() nếu bạn dùng connection pool
  // } catch (err) {
  //   console.error('Error executing query:', err);
  //   res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
  // }
  console.log("Get ALL Products", productId)
};
// lấy 1 sp theo id
export const getProductById = async (req, res) => {
  // try {
  //   const connection = await getConnection(); // 
  //   let sql = await req.params.id
  //   const [results] = await connection.query('SELECT * FROM `users` where id= '+sql);
    
  //   // Trả về kết quả truy vấn dưới dạng JSON
  //     res.json(results);
  //   console.log(results)
  //   console.log(sql)
    

  //   // Không cần connection.end() nếu bạn dùng connection pool
  // } catch (err) {
  //   console.error('Error executing query:', err);
  //   res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
  // }
  const productId = req.params.id;
  res.send(`Product ID is: ${productId}`);
  
  console.log("Get Products By ID")
  
  
};