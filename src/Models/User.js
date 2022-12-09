const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },

    userPicture: [
        { img: { type: String } }
      ],

    address:{
        type: String,
    },
    gender:{
        type: String,
    },
    contactNumber:{
        type: String,
        required: true,
    }

}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports=mongoose.model('User',UserSchema);