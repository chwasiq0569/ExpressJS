const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); //middleware
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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

const User = mongoose.model("User", userSchema);

app.get("/register", (req, res) => {
  res.send("User");
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
      const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
      res
        .header("x-auth-token", token)
        .send(_.pick(req.body, ["username", "email"]));
    } catch (err) {
      console.log("Error Occured in Creating New User: ", err.message);
    }
  };
  createUser();
});

app.post("/login", (req, res) => {
  const createUser = async () => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password...");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) res.status(400).send("Invalid email or password...");
    console.log(validPassword);
    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    res.send(token);
  };
  createUser();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
