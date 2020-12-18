const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Not Found!!!");
    return;
  }
  res.send(course);
});

router.put("/:id", (req, res) => {
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

router.post("/api", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
