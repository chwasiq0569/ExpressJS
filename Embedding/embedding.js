const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/embedding")
  .then(() => console.log("Connection Established..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err.message));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: {
      type: [authorSchema],
      required: true,
    },
  })
);

const createCourse = async (name, authors) => {
  const course = new Course({
    name,
    authors,
  });
  const result = await course.save();
  console.log(result);
};

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
};

const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId);
  // console.log(course.authors[0]._id);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
};

const updateAuthor = async (courseId) => {
  const course = await Course.findById(courseId);
  course.author.name = "Ch Wasiq";
  const result = await course.save();
  console.log(result);
};
//by using update
const updateAuthorUpdateFirst = async (courseId) => {
  const course = await Course.update(
    {
      _id: courseId,
    },
    {
      //to remove author document use $unset
      $set: {
        "author.name": "Mosh Haemdani",
      },
    }
  );
};

const listCourses = async () => {
  const courses = await Course.find()
    .populate("author", "name -_id") //only include name from author & exclude id
    .select("name author");
  console.log("author: ", courses[0]._doc.author._doc);
  console.log("courses: ", courses[0]._doc);
  //   // let d = courses[0];
  //   // console.log(d.);
};

// createCourse("NodeJS Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Wasiq" }),
// ]);
removeAuthor("5fe210d1b56e633a14f8f8a7", "5fe23c618dc17d14600d9f39");
// addAuthor("5fe210d1b56e633a14f8f8a7", new Author({ name: "Amy" }));

// updateAuthor("5fe1f0239070cb5ca4653fa0");
// updateAuthorUpdateFirst("5fe1f0239070cb5ca4653fa0");
// listCourses();
