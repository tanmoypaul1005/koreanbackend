
const app = require("express");
const { AddCategory, getCategories,CategoryDetail } = require("../Controller/CategoryController");
const router = app.Router();


//add category
router.post('/category/add',AddCategory);

//get category
router.get('/category/get',getCategories);

//get Product
router.post('/categorydetail',CategoryDetail)
module.exports = router;