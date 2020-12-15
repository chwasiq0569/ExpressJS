const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});
app.get("/api/posts/:year/:month", (req, res) => {
  //parameters
  //queryString optional ?sortBy=name
  res.send(req.params);
  //   res.send(req.query);
});
// app.get("/api/posts/:year/:month", (req, res) => {
//   //queryString optional
//   res.send(req.params.query);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));
