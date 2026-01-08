const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const userLogin = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Please fill all the details" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const userObj = user.toObject();
  delete userObj.passwordHash;

  return response.status(200).json(userObj);
};

const userSignup = async (request, response) => {
  const { username, email, password, name } = request.body;
  if (!username || !password || !email || !name) {
    return response
      .status(400)
      .json({ message: "Please fill all the details" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      message: "User already exists! Please try a different email id.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = User({ username, email, passwordHash, name });
  const savedUser = await newUser.save();

  if (!savedUser) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
  // converting mongoose document to plain JS object
  const userObj = savedUser.toObject();
  delete userObj.passwordHash;

  return response.status(200).json(userObj);
};

module.exports = { userLogin, userSignup };
