const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./Routes/userRoutes");
const { flightRoutes } = require("./Routes/flightsRoutes");
const { bookingRoutes } = require("./Routes/bookingRoutes");

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.get("/", (req,res) => {
    res.send({"Message":"welcome to Amit's Airlines"})
})

app.use("/api",userRoutes)
app.use("/api", flightRoutes)
app.use("/api", bookingRoutes)


app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("Connection to DB Success")
    } 
    
    catch (err) {
        console.log("Connection to DB Failed")
        console.log(err)    
    }

    console.log(`running on port ${process.env.port}`)
})