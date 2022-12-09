exports.userMiddleware = (req, res, next) => {
    if ("user" !== req.user.role) {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };

  
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !=='admin'){
        return res.status(400).json({message: 'Admin Access denied'});
    }
    next();
}