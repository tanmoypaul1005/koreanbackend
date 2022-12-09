
const app = require("express");
const { AddAddress, GetAddress } = require("../Controller/AddressController");
const router = app.Router();


//add address
router.post('/address/add',AddAddress);

//get address
router.get('/address/get',GetAddress)

module.exports = router;