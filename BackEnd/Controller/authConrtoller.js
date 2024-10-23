const express = require("express");
const router = express.Router();
const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utills/JWT");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    
    const user = await userModel.findOne({ userName });
    

    if (!user) {
      return res.status(400).json({ error: "Invalid userName or password!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid userName or password!" });
    }

    return res.json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/signup", async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await userModel.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HIDDEN Password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    // Avatars Rest API
    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new userModel({
      fullName,
      userName,
      password: securePassword,
      gender,
      profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
    });

    if (newUser) {
      await newUser.save();
      const token = generateToken(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
        token: token,
      });
    } else {
      return res.status(400).json({ error: "Failed to create user" });
    }
  } catch (e) {
    console.log("Error in logout Controller", e.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/logout", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "logged Out successfully",
    });
  } catch (e) {
    console.log("Error in logout Controller:", e.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
