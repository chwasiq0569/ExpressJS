const express = require("express");
const Joi = require("joi");
const app = express();

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

app.use(express.json()); //middleware

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) res.status(404).send("This Corse is not available");
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) res.status(404).send("Not Found!!!");

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
