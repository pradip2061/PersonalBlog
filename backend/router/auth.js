const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }

    // Get user info from Google
    const googleUser = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(googleUser)
    const { sub: googleId, email, name, picture } = googleUser.data;

    if (!email) {
      return res.status(400).json({ message: "Failed to retrieve user info from Google" });
    }

    // Create or update user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        profilepic: picture || "",
      });
    } else if (!user.profilepic && picture) {
      user.profilepic = picture;
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilepic: user.profilepic,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({ message: "Google authentication failed" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
