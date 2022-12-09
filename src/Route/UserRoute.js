const app = require("express");
const { AddUser, GetUser, DeleteUser, UserLogin } = require("../Controller/UserController");
const router = app.Router();


//ADD user
router.post('/user/add',AddUser);

//User Login
router.post('/user/login',UserLogin);

//Get All User List
router.get('/user/get',GetUser);

//Singel User Delete 
router.post('/user/delete',DeleteUser);

module.exports = router;