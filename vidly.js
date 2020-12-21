const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
// const app = express();
// const config = require("config");
// console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`Configuration Name: ${config.get("name")}`);
// console.log(`Mail Host: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);
// ////////////////////////////////////////////////////////////
// console.log(`app.get('env'): ${app.get("env")}`);
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err));

const vidlySchema = new mongoose.Schema({
  id: String,
  movie: String,
  genre: String,
});

const Movie = mongoose.model("Movie", vidlySchema);

app.use(express.json()); //middleware

// app.get("/vidly/movies", (req, res) => {
//   const getMovies = async () => {
//     const movies = Movie.find()
//       .sort({ id: 1 })
//       .select({ id: 1, movie: 1, genre: 1 });
//     console.log("movies: ", movies);
//   };
//   // getMovies();
//   res.send("Hello World");
// });

// app.post("/vidly/movies", (req, res) => {
//   const createMovie = async () => {
//     const movie = new Movie({
//       id: uuidv4(),
//       movie: req.body.movie,
//       genre: req.body.genre,
//     });
//     try {
//       const result = await movie.save();
//       console.log("Result: ", result);
//       res.send(result);
//     } catch (err) {
//       console.log("Error Occured in Creating Movie: ", err.message);
//     }
//   };
//   createMovie();
// });

app.get("/myapp/", (req, res) => {
  res.send("Hello WOrld");
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
