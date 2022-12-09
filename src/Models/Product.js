const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: Number },
    slug: { type: String },
    stock: {
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    productPictures: [{ img: { type: String } }],
    brand: { type: String },
    description: { type: String },
    offer: { type: Number },
    offerprice: { type: Number },
    metatag: { type: Number },
    metatagdescription: { type: String },
    metatagdescription: { type: String },
    rewardoints: { type: String },
    quantity: { type: String },
    minimumquantity: { type: String },
    seourl: { type: String },
    subtractstock: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },
    lengthclass: {
      type: String,
      enum: ["inch", "millimeter", "centimeter"],
      default: "N/A",
    },
    weightclass: {
      type: String,
      enum: ["kilogram", "gram", "pound", "ounce", "millilitre"],
      default: "N/A",
    },
    weight: { type: String },

    length: { type: String },
    width: { type: String },
    height: { type: String },
    status: {
      type: String,
      enum: [
        "Regular Product",
        "New Arrivals",
        "Popular Products",
        "Featured Products",
      ],
      default: "Regular Product",
    },
    // totalreviews:{type:Number},
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        star: { type: Number },
        required: false,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
