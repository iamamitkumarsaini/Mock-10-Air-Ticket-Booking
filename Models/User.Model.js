const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    versionKey:false
})


const User = mongoose.model("user",userSchema);

module.exports = { User };