
const app = require("express");
const { AddProduct,GetProductDetail, GetProductAdmin, GetFeatured_Products, GetNew_Arrivals, DeleteProduct, ProductDetail, ProductEdit, GetPopular_Products, GetRegular_Products, GetProductsFilterByCategory } = require("../Controller/ProductController");

const router = app.Router();

//add product
router.post('/product/add',AddProduct);

// get Product Detail params by id
router.get('/productdetails/:id',GetProductDetail);

//get Product Admin only
router.post('/product/admin/get',GetProductAdmin);

//get Product Featured Product
router.get('/product/get/featuredproduct',GetFeatured_Products);

//get Product Regular  Product
router.get('/product/get/regularproduct',GetRegular_Products);

//get Product Popular Product
router.get('/product/get/popularproduct',GetPopular_Products);

//get Product Newarrivals
router.get('/product/get/newarrivals',GetNew_Arrivals);

//Product Delete
router.post('/product/delete',DeleteProduct);

// Get Product Detail
router.post('/product/id',ProductDetail);

//Product Edit
router.post('/product/edit',ProductEdit);

router.get('/product/filter/:category',GetProductsFilterByCategory)

module.exports = router;