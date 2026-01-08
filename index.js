require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userLogin, userSignup } = require("./controllers/auth.controller");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware, common mistake
app.use(express.json());

app.post("/login", userLogin);

app.post("/signup", userSignup);

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to connect :("));
