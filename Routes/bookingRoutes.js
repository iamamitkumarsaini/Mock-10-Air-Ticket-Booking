const express = require("express");
const { Booking } = require("../Models/Booking.Model");
const { Flight } = require("../Models/Flight.Model");
const { User } = require("../Models/User.Model");
require("dotenv").config();

const bookingRoutes = express.Router();

bookingRoutes.post("/bookings",async(req,res) => {
    const userId = req.body.user;
    const flightId = req.body.flight;

    const user = await User.findById({_id:userId})
    const flight = await Flight.findById({_id:flightId})

    const payload = req.body;
    console.log(payload)
    try {
        const booking = new Booking({payload,user,flight});
        await booking.save();
        res.status(201).send({"Message":"Flight Added Successfully",payload})
    } 
    
    catch (err) {
        console.log(err);
        res.status(400).send({"Message":"Error While Adding Flight, try again Later"})
    }
})


bookingRoutes.get("/dashboard",async(req,res) => {

    try {
        const bookings = await Booking.find()
        res.status(200).send(bookings)
    } 
    
    catch (err) {
      console.log(err);
      res.status(400).send({"Message":"Bad Request, Please try again Later"})
    }
})

module.exports = { bookingRoutes }
