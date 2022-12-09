const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const ErrorHander = require("../utils/ErrorHander");
const slugify = require('slugify');
const passport = require("passport");
require("../config/Passport")(passport);

module.exports.AddUser=(req,res,next)=>{
  const{ name,email,password,contactNumber}=req.body; 
  let userPicture = [];
  if (req.files.length > 0) {
    userPicture= req.files.map((file) => {
      return { img: file.location };
    });
  }

  
  User.findOne({email:email})
  .exec((error,data)=>{
   if(data){return next(new ErrorHander("User All Rady Register", 500));}

   const _user=new User({name,username:name,email,password,role:'user',contactNumber,userPicture});
   _user.save((error,data)=>{
    if(error){return res.status(505).json({error});}
    if(data){return res.status(201).json({msg:'User Create Successfully',data })}
   });
  });
}

 module.exports.UserLogin=(req,res,next)=>{
  User.findOne({email:req.body.email}).exec((error,data)=>{
      if(data.role === 'user'){
  
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) return res.status(201).json("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' })
          return res.status(200).json({msg:"Successfully Authenticated",user,token});
        });
      }
    })(req, res, next);
    
  }else{  return res.status(200).json({msg:"Only Admin is Login"});}
  })
}

 module.exports.GetUser=(re,res)=>{
  User.find({role:'user'})
  .exec((error,data)=>{
    if(error) return res.status(201).json({error})

    if(data){
      return res.status(200).json({data})
    }
  })
}

module.exports.DeleteUser=(req,res)=>{
  User.findOneAndDelete({_id:req.body.id})
  .exec((error,data)=>{
      if(error){return res.status(400).json({error})}
      if(data){return res.status(200).json({msg:'Product is Delete'})}
  })
}





