const express = require("express");
const app = express();

const movies = [
  {
    id: 1,
    movie: "Movies1",
    genre: "action",
  },
  {
    id: 2,
    movie: "Movies2",
    genre: "action",
  },
  {
    id: 3,
    movie: "Movies3",
    genre: "romantic",
  },
  {
    id: 4,
    movie: "Movies4",
    genre: "romantic",
  },
];

// app.use(express.json()); //middleware

// app.get("/vidly/movies", (req, res) => {
//   res.send(movies);
// });

app.use(express.json()); //middleware

app.get("/api/courses", (req, res) => {
  res.send(movies);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}`));

// app.get("/vidly/movie/:genre", (req, res) => {
//   const foundMovies = movies.filter((m) => m.genre === req.params.genre);
//   if (!foundMovies) res.status(404).send("Movie Not Found!!!");

//   res.send(foundMovies);
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening to Port ${port}`));
