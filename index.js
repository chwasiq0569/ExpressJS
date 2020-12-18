const startUpDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const Joi = require("joi");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

app.set("view engine", "pug");
// app.set("views", "./views"); //default

const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];

const validateCourse = (course) => {
  const schema = {
    course: Joi.string().min(3).required(),
  };
  const result = Joi.validate(course, schema);
  return result;
};
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

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan Enabled");
  //set environment variable DEBUG=app:startup
  //set environment variable DEBUG=app:*
}

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello World" });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Not Found!!!");
    return;
  }
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Not Found!!!");
    return;
  }

  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.course = req.body.course;
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  const course = {
    id: courses.length + 1,
    course: req.body.course,
  };
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  courses.push(course);
  res.send(course);
});

app.delete("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Not Found!!!");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
