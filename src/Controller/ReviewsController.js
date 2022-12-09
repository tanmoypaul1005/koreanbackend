const Product = require("../Models/Product")

// user Add Comment
module.exports.addReview=(req,res)=>{
    const {id,comment,star,user}=req.body;
   const reviewsItem={comment,star,user}
    Product.findOneAndUpdate({_id:id},{ $push: {reviews:reviewsItem}}, {new: true,upsert: true,setDefaultsOnInsert: true })
    .exec((error,data)=>{
        if(error){return res.status(505).json({error});}
        if(data){return res.status(200).json({msg:'Your Comment Add Succsfullay',data});}
    })
}