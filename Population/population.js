const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/population")
  .then(() => console.log("Connection Established..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err.message));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

const createCourse = async (name, author) => {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
};

const createAuthor = async (name, bio, website) => {
  const author = new Author({
    name: name,
    bio: bio,
    website: website,
  });
  const result = await author.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = await Course.find()
    .populate("author", "name -_id") //only include name from author & exclude id
    .select("name author");
  console.log("author: ", courses[0]._doc.author._doc);
  console.log("courses: ", courses[0]._doc);
  // let d = courses[0];
  // console.log(d.);
};

// createAuthor("Wasiq", "Full Stack Develper", "www.wasiqabdullah.com");
// createCourse("NodeJS Course", "5fe1dfc2c9ea0150e43c0055");
listCourses();
