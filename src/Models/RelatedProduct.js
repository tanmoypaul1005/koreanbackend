const mongoose = require("mongoose");
const RelatedProductSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    relatedproduct: [
      {
        product: {type: mongoose.Schema.Types.ObjectId,ref: "Product",required: true},
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("RelatedProduct", RelatedProductSchema);
