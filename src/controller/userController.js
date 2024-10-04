import getConnection from '../config/db.js';  // Import kết nối pool hoặc connection
import { createUserService ,updateUserService,deleteUserService} from '../services/userServices.js';


export const getAllUser = async (req,res) => {
    try {
    const connection = await getConnection(); // Lấy kết nối từ pool

    const [results] = await connection.execute('SELECT * FROM `user`');
    
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
    
};

// export const getUserById = async (req,res) => {
//     console.log("Get User By Id");
//     const UserId = req.params.id;
//     try {
//         const connection = await getConnection(); // Lấy kết nối từ pool
    
//         const [results] = await connection.execute('SELECT * FROM where id =`?`',[UserId]);
        
//         // Trả về kết quả truy vấn dưới dạng JSON
//         //   res.json(results);
//             //   console.log(results)
//             return res.status(200).json({
//                 message: 'ok',
//                 results
//             })
    
//         // Không cần connection.end() nếu bạn dùng connection pool
//       } catch (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
//       }
//         console.log("Get User ById");

// };
export const getUserById = async (req, res) => {
    console.log("Get User By Id");
    const UserId = req.params.id;
    try {
        const connection = await getConnection(); // Lấy kết nối từ pool
        
        // Thực hiện câu truy vấn chính xác
        const [results] = await connection.execute('SELECT * FROM user WHERE id = ?', [UserId]);
        
        // Trả về kết quả truy vấn dưới dạng JSON
        return res.status(200).json({
            message: 'ok',
            results
        });
    
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');  // Gửi phản hồi lỗi nếu có
    }
    console.log("Get User ById");
};

export const createUser = async(req, res)=>{
    // const UserId = req.params.id;
    await createUserService(req.body,res)
    return res.send("Create User")

}

export const updateUserById = async (req, res) => {
    try {
        const data = req.body;
        const result = await updateUserService(data);
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Đã xảy ra lỗi khi cập nhật người dùng",
        });
    }
};
//////////////////////////////////////////
  

export const deleteUserById = async (req, res) => {
    const data = req.body
   await deleteUserService(data,res)
  };
  