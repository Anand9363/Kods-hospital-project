const User = require("../models/User");
const Hospital = require("../models/Hospital");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email,password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive"
      });
    }

    if (user.hospitalId) {
      const hospital = await Hospital.findById(user.hospitalId);

      if (!hospital || !hospital.isActive) {
        return res.status(403).json({
          message: "Hospital is inactive"
        });
      }
    }

  
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hospitalId: user.hospitalId
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};