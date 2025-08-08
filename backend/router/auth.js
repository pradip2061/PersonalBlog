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

    // Fetch user info from Google
    const googleUser = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { sub: googleId, email, name, picture } = googleUser.data;

    if (!email) {
      return res.status(400).json({ message: "Failed to retrieve user info from Google" });
    }

    // Check if user exists, otherwise create new
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
    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Store JWT in HTTP-only cookie
    res.cookie("token", appToken, {
      httpOnly: true,
      secure: true, // use HTTPS in production
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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

router.post("/logout", async (req, res) => {
try {
 res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
res.status(200).json({message:'logout successfully'})
} catch (error) {
  console.log(error)
}
})

module.exports = router;
