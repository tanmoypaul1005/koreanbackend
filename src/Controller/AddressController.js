const Address = require("../Models/Address");

module.exports.AddAddress = (req, res) => {
  const {
    user,
    name,
    Housename,
    contactNumber,
    postalCode,
    locality,
    address,
    district,
    divisions,
    rodename,
    upazila,
    alternatePhone,
    addressType,
  } = req.body;
  const addressbody = {
    user,
    name,
    Housename,
    contactNumber,
    postalCode,
    locality,
    address,
    district,
    divisions,
    rodename,
    upazila,
    alternatePhone,
    addressType,
  };
  Address.find({ user: req.body.user }).exec((error, data) => {
    if (error) return res.status(201).json({ error });

    if (data) {
      Address.findOneAndUpdate(
        { user: user },
        { $push: { address: addressbody } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec((error, data) => {
        if (error) return res.status(400).json({ error });
        if (data) {
          return res.status(200).json({ msg: "Add Address Succsfullay", data });
        }
      });
    }
  });
};


//User Adress List
module.exports.GetAddress = (req, res) => {
  Address.findOne({ user: req.body.user }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
};
