const startUpDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const Joi = require("joi");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("./router/courses");
const home = require("./router/home");

app.set("view engine", "pug");
// app.set("views", "./views"); //default

console.log(`Configuration Name: ${config.get("name")}`);
console.log(`Mail Host: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);
////////////////////////////////////////////////////////////
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app.get('env'): ${app.get("env")}`);

// if (app.get("env")) {
//   app.use((req, res, next) => {
//     console.log("Custom Middleware");
//     next();
//   });
// }

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: true })); //middleware
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan Enabled");
  //set environment variable DEBUG=app:startup
  //set environment variable DEBUG=app:*
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
