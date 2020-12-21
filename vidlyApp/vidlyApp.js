const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); //middleware

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err));

const vidlySchema = new mongoose.Schema({
  name: String,
  genre: String,
});

const Genre = mongoose.model("Genre", vidlySchema);

app.get("/vidly", (req, res) => {
  const getMovies = async () => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  };
  getMovies();
});

app.post("/vidly", (req, res) => {
  console.log("req.body: ", req.body);
  const createMovie = async () => {
    const movie = new Genre({
      name: req.body.movie,
      genre: req.body.genre,
    });
    try {
      const result = await movie.save();
      console.log("Result: ", result);
      res.send(result);
    } catch (err) {
      console.log("Error Occured in Creating Movie: ", err.message);
    }
  };
  createMovie();
});

app.put("/vidly/:id", async (req, res) => {
  const result = await Genre.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      genre: req.body.genre,
    },
    new: true,
  });
  res.send(result);
});

app.delete("/vidly/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The Genre with given ID doesnt exists");
  res.send(genre);
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
