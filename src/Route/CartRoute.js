
const app = require("express");
const { AddCart,getCartItems } = require("../Controller/CartController");
const router = app.Router();

//add cart
router.post('/cart/add',AddCart);

//get cart
router.post('/cart',getCartItems);

module.exports = router;