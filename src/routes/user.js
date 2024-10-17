import express from 'express';

import { getUserById, getAllUser, createUser,updateUserById,deleteUserById } from '../controller/userController.js';
// import { getUserById1, getAllUser1 } from '../controller/userController.js';

const routerUser = express.Router();



const initUserRouter = (app) => {
  routerUser.get('/user', getAllUser);  //get all users
  routerUser.get('/userById/:id', getUserById);  //get user by id
  routerUser.post('/createUser', createUser);  //tạo mới người dùng

  routerUser.post('/updateUser', updateUserById);  //update người dùng
  routerUser.delete('/deleteUser/', deleteUserById);  //update người dùng

  

    
  return app.use('/api/v1', routerUser); // make sure '/' is added before 'api/v1'
};

export default initUserRouter;

