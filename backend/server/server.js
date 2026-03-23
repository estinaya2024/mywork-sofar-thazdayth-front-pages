require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//here i created the server 
const app = express();

// server.js — add this near the top
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8080', // your React dev URL
  credentials: true,
}));

//to make our server able to read json data
app.use(express.json());

//connection to mongo atlas 
mongoose.connect("mongodb+srv://thazdayt:projet2cp@thazdayt.jrhzzbk.mongodb.net/?appName=thazdayt")
  .then(() => console.log("MONGO DB IS CONNECTED"))
  .catch(error => console.log(`MONGO DB CONNECTION FAILURE ${error}`));

//authoration router
const authRoutes = require("./routes/auth").default;
app.use("/api/auth", authRoutes);

//this verify the tokens (the users) 
const { authenticate, ownerOnly } = require("./middleware/auth");
const router = express.Router();
app.get("/test", authenticate, (req, res) => {
  try {

    res.json({
      message: "Access granted",
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/owner", authenticate, ownerOnly, (req, res) => {
  res.json({
    message: "Owner access granted"
  });
});
module.exports = router;


//sent the server to the port to listen to requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`THE SERVER IS RUNNIG ON PORT ${PORT}`);
});