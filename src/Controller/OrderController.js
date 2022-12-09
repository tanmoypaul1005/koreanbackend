const Address = require("../Models/Address");
const Cart = require("../Models/Cart");
const Order = require("../Models/Order");

module.exports.addOrder = (req, res) => {
    Cart.deleteOne({ user: req.body.user }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        req.body.user = req.body.user;
        req.body.orderStatus = [
          {
            type: "ordered",
            date: new Date(),
            isCompleted: true,
          },
          {
            type: "packed",
            isCompleted: false,
          },
          {
            type: "shipped",
            isCompleted: false,
          },
          {
            type: "delivered",
            isCompleted: false,
          },
        ];
        const order = new Order(req.body);
        order.save((error, order) => {
          if (error) return res.status(400).json({ error });
          if (order) {
            res.status(201).json({ order });
          }
        });
      }
    });
  };
  


  module.exports.getOrders = (req, res) => {
    Order.find({ user: req.body.user })
      .select("_id paymentStatus paymentType orderStatus items")
      .populate("items.productId", "_id name productPicture")
      .exec((error, orders) => {
        if (error) return res.status(400).json({ error });
        if (orders) {
          res.status(200).json({ orders });
        }
      });
  };
