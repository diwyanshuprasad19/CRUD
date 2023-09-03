const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    items: [
        {
           name:{
                type : String,
                required : true,
            },
            salary:{
                type : Number,
                required : true,
            },
            country:{
                type : String,
                required : true,
            },
            email:{
                type : String,
                required : true,
            },
        } 
      ],
});
const User = mongoose.model("UserData",UserSchema);
module.exports = User;
