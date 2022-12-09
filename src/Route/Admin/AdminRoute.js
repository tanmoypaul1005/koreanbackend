
const app = require("express");
const passport = require("passport");
const { AddAdmin, AdminLogin, GetAdmin } = require("../../Controller/Admin/AdminController");
const router = app.Router();

//Add Admin
router.post('/admin/add',AddAdmin);

//Admin Login
router.post('/admin/login',AdminLogin);

//Get Admin List
router.post('/admin/get',GetAdmin);
module.exports = router;