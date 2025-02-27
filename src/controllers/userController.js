const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  const { name, email, password, mobileNumber, gender } = req.body;
  try {
    const user = new User({ name, email, password, mobileNumber, gender });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id, user.role);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };