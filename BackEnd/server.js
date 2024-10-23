const express = require('express')
const app = express();
let PORT =  8000;
// const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/realTimeChat").then(() => console.log("Connected to DB"));

app.use(express.json());
app.use(cors());

const authController = require("./Controller/authConrtoller")
app.use("/auth", authController)

const massageController = require("./Controller/massageController")
app.use("/messages", massageController)

const userController = require("./Controller/userController")
app.use("/users", userController)

// http://localhost:8000/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
