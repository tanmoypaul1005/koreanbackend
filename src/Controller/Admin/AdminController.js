const jwt = require("jsonwebtoken");
const User = require("../../Models/User");
const ErrorHander = require("../../utils/ErrorHander");
const passport = require("passport");
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const shortid = require("shortid");
const LocalStrategy = require("passport-local").Strategy;
require("../../config/Passport")(passport);

module.exports.AddAdmin = (req, res, next) => {
  const { name, email, password, contactNumber, gender } = req.body;
  let userPicture = [];
  if (req.files.length > 0) {
    userPicture= req.files.map((file) => {
      return { img: file.location };
    });
  }
  User.findOne({ email: email }).exec((error, data) => {
    if (error) {
      return next(new ErrorHander("Somethings is Wrong", 500));
    }
    if (data) {
      return next(new ErrorHander("User All Rady Register", 500));
    }
    const _user = new User({
      name,
      username:shortid.generate(),
      email,
      password,
      role: "admin",
      contactNumber,
      gender,
      userPicture
    });
    _user.save((error, data) => {
      if (error) {
        return next(new ErrorHander("Somethings is Wrong", 500));
      }
      if (data) {
        return res.status(200).json({ msg: "Admin Create Successfully", data });
      }
    });
  });
};

module.exports.AdminLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, data) => {
    if (data.role === "admin") {
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(201).json("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' })
            return res
              .status(200)
              .json({ msg: "Successfully Authenticated", user,token });
          });
        }
      })(req, res, next);
    } else {
      return res.status(200).json({ msg: "Only Admin is Login" });
    }
  });
};
module.exports.GetAdmin = (re, res) => {
  User.find({ role: "admin" }).exec((error, data) => {
    if (error) return res.status(201).json({ error });

    if (data) {
      return res.status(200).json({ data });
    }
  });
};
