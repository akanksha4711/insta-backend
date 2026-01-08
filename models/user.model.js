const mongoose = require("mongoose");

// Step 1: Create a Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true },
});

// Step 2: Create a model from the Schema
const User = mongoose.model("User", userSchema);

// Step 3: Export/expose the Model
module.exports = { User };
