const express = require("express");
const app = express();

const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];

app.use(express.json()); //middleware

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) res.status(404).send("This Corse is not available");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    course: req.body.course,
  };
  courses.push(course);
  res.send(course);
});

// app.get("/api/posts/:year/:month", (req, res) => {
//   //parameters
//   //queryString optional ?sortBy=name
//   res.send(req.params);
//   //   res.send(req.query);
// });
// app.get("/api/posts/:year/:month", (req, res) => {
//   //queryString optional
//   res.send(req.params.query);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
