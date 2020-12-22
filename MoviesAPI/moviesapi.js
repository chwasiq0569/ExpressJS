const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost/moviesapi")
  .then(() => console.log("Connection Established..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err));

const genreSchema = new mongoose.Schema({
  name: String,
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Genre = mongoose.model("Genre", genreSchema);
const Movie = mongoose.model("Movie", movieSchema);

const createMovie = async (genre) => {
  const movie = new Movie({
    name: "Terminator",
    genre: genre,
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  const result = await movie.save();
  console.log("result: ", result);
};
createMovie(new Genre({ name: "Sci-fi" }));
// const createMovie = async () => {

// }
