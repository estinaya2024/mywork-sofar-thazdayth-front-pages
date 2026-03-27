require("dotenv").config() ;
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcrypt") ;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MONGODB CONNECTED"))
.catch(error => console.log(`MONGODB CONNECTION FAILURE${error}`));

const seedOwner = async () => {

  try {
    const existingOwner = await User.findOne({ role: "owner" });
    if (existingOwner) {
      console.log("Owner already exists");
      return mongoose.disconnect();
    }

    const hashedpw = await bcrypt.hash("123456", 12);
  
    const owner = new User({
      first_name: "admin",
      last_name:"tazdayth",
      email: "thazdayth@admin.com",
      phone: "05555556",
      password: hashedpw,
      role: "owner",
    });

    await owner.save() ;

    console.log("Owner created successfully");

    mongoose.disconnect();

  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedOwner();
