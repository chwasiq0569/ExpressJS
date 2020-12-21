const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log("Error Occured: ", err));

const courseScheme = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseScheme);

const createCourse = async () => {
  const course = new Course({
    name: "AngularJS Course",
    author: "Mosh",
    tags: ["Angular", "Frontend"],
    // date is set to default
    isPublished: true,
  });

  const result = await course.save();
  console.log("result: ", result);
};

createCourse();
