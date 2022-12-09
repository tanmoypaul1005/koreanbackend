const Cart = require("../Models/Cart");

module.exports.AddCart = (req, res) => {
  const { user, product, quantity } = req.body;
  const cartItem = { product, quantity };
  Cart.find({ user: req.body.user }).exec((error, data) => {
    if (error) return res.status(201).json({ error });
    // Cart.findOne({ "cartItems.product": product,user: req.body.user  }).exec((error, data) => {
    // if (data) return res.status(201).json({ data });
      if (data) {
        Cart.findOneAndUpdate(
          { user: user },
          { $push: { cartItems: cartItem } },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        ).exec((error, data) => {
          if (error) return res.status(400).json({ error });
          if (data) {
            return res
              .status(200)
              .json({ msg: "Add Product Succsfullay", data });
          }
        });
      }
    // });
  });
};

exports.getCartItems = (req, res) => {
  console.log(req.body)
  Cart.find({ user: req.body.user})
    .populate("cartItems.product", "_id name price productPicture")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        return res.status(202).json({ cart  });
      }
    });
};

