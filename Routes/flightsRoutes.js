const express = require("express");
const { Flight } = require("../Models/Flight.Model");
require("dotenv").config();

const flightRoutes = express.Router();

flightRoutes.post("/flights",async(req,res) => {
    const payload = req.body;
    console.log(payload)
    try {
        const flight = new Flight(payload);
        await flight.save();
        res.status(201).send({"Message":"Flight Added Successfully",payload})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Error While Adding Flight, try again Later"})
    }
})


flightRoutes.get("/flights",async(req,res) => {

    try {
        const flights = await Flight.find()
        res.status(200).send(flights)
    } 
    
    catch (err) {
      console.log(err);
      res.status(500).send({"Message":"Bad Request, Please try again Later"})
    }
})


flightRoutes.get("/flights/:id",async(req,res) => {

    try {
        const flightId = req.params.id;
        const flight = await Flight.findById({_id:flightId})
        res.status(200).send(flight)
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Bad Request, Please try again Later"})
    }
})


flightRoutes.patch("/flights/:id",async(req,res) => {
    console.log("req",req.body)
    try {
        const flightId = req.params.id;
        const payload = req.body;
        await Flight.findByIdAndUpdate(flightId,payload);
        res.status(204).send({"Message":"Flight Details Updated", payload})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Bad Request, Please try again Later"})
    }
})


flightRoutes.put("/flights/:id",async(req,res) => {
    try {
        const flightId = req.params.id;
        const payload = req.body;
        await Flight.findByIdAndUpdate(flightId,payload);
        res.status(204).send({"Message":"Flight Details Updated", payload})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Bad Request, Please try again Later"})
    }
})


flightRoutes.delete("/flights/:id",async(req,res) => {
    try {
        const flightId = req.params.id;
        await Flight.deleteOne({_id:flightId});
        res.status(202).send({"Message":"Deleted Successfully"})
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Bad Request, Please try again Later"})
    }
})

module.exports = { flightRoutes };