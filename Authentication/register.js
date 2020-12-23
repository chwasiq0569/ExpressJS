const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); //middleware
const _ = require("lodash");

mongoose
  .connect("mongodb://localhost/auth")
  .then(() => console.log("Connection Established..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

app.get("/register", (req, res) => {
  res.send("User");
});

app.post("/register", (req, res) => {
  const createUser = async () => {
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send("User already exists...");
    user = new User(_.pick(req.body, ["username", "email", "password"]));
    try {
      const result = await user.save();
      res.send(_.pick(req.body, ["username", "email"]));
    } catch (err) {
      console.log("Error Occured in Creating New User: ", err.message);
    }
  };
  createUser();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
