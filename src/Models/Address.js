const mongoose=require('mongoose');
const AddressSchema=new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
address:[
    {
        name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
      },
      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
      },
      locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      divisions: {
        type: String,
        required: true,
        required: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      upazila:{
        type: String,
        required: true,
        trim: true,
      },
      rodename:{
        type: String,
        required: true,
        required: true,
      },
      Housename: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
      },
      alternatePhone: {
        type: String,
      },
      addressType: {
        type: String,
        required: true,
        enum: ["home", "work"],
        required: true,
      },
    }
]
},{timestamps:true});
module.exports=mongoose.model('Address',AddressSchema)