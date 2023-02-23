const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    flight:{type:mongoose.Schema.Types.ObjectId,ref:"Flight"},
},{
    versionKey:false
})


const Booking = mongoose.model("bookings",bookingSchema);

module.exports = { Booking };