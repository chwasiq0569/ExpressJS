const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); //middleware
const auth = require("./auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

process.on("uncaughtException", (ex) => {
  console.log("Uncaught Exception: ", ex);
});
process.on("unhandledRejection", (ex) => {
  console.log("Uncaught Rejection: ", ex);
});
console.log('config.get("jwtPrivateKey"): ', config.get("jwtPrivateKey"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1);
}

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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

app.get("/me", auth, async (req, res) => {
  console.log("req.user._id: ", req.user._id);
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

app.post("/register", (req, res) => {
  const createUser = async () => {
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send("User already exists...");
    user = new User(_.pick(req.body, ["username", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
      await user.save();
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .send(_.pick(req.body, ["username", "email"]));
    } catch (err) {
      console.log("Error Occured in Creating New User: ", err.message);
    }
  };
  createUser();
});

app.post("/login", auth, (req, res) => {
  const loginUser = async () => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password...");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) res.status(400).send("Invalid email or password...");
    console.log(validPassword);
    const token = user.generateAuthToken();
    res.send(token);
  };
  loginUser();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
