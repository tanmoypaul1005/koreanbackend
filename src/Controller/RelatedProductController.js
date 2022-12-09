const RelatedProduct = require("../Models/RelatedProduct");

module.exports.AddRelatedProduct = (req, res) => {
  const { product, productId } = req.body;
  console.log(product);
  RelatedProduct.find({ user: productId }).exec((error, data) => {
    if (error) return res.status(201).json({ error });
    if (data) {
      RelatedProduct.findOne({ "relatedproduct.product": product }).exec(
        (error, data) => {
          if (data)
            return res
              .status(201)
              .json({ msg: "Your Product AllRady added ", error });
          else {
            RelatedProduct.findOneAndUpdate(
              { productId: productId },
              { $push: { relatedproduct: req.body } },
              { upsert: true, new: true, setDefaultsOnInsert: true }
            ).exec((error, data) => {
              if (error) return res.status(400).json({ msg: "Y00our ", error });
              if (data) {
                return res
                  .status(200)
                  .json({ msg: "Add Product Succsfullay", data });
              }
            });
          }
        }
      );
    }
  });
};
module.exports.GetRelatedProduct=(req,res)=>{
    RelatedProduct.findOne({productId:req.params.id})
    .exec((error,data)=>{
      if(error) return res.status(400).json({ msg: "Somethings is Wrong" });
      if(data){ 
        return res.status(200).json({ data })
      }
    })
}
