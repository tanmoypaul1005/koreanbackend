const app = require("express");
const { addOrder, getOrders } = require("../Controller/OrderController");

const router = app.Router();

//add order
router.post('/order/add',addOrder);

//get order
router.post("/order/get", getOrders);


module.exports = router;