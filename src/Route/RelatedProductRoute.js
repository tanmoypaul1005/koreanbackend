const app = require("express");
const { AddRelatedProduct, GetRelatedProduct } = require("../Controller/RelatedProductController");
const router = app.Router();


//Add Related Product
router.post('/relatedproduct/add',AddRelatedProduct);

//Get Related Product
router.get('/relatedproduct/:id',GetRelatedProduct)
module.exports = router;