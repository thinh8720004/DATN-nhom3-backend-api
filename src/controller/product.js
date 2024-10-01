import getConnection from '../config/db.js';  // Import kết nối pool hoặc connection

// Hàm getProduct cần là async để dùng được await
export const getProduct = async (req, res) => {
  try {
    const connection = await getConnection(); // Lấy kết nối từ pool

    const [results] = await connection.query('SELECT * FROM `users`');
    
    // Trả về kết quả truy vấn dưới dạng JSON
      res.json(results);
      console.log(results)

    // Không cần connection.end() nếu bạn dùng connection pool
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
  }
};
