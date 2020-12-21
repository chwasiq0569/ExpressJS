const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connection Established Successfully!!"))
  .catch((err) => console.log("Error Occured: ", err));

const courseSchema = new mongoose.Schema({
  _id: String,
  author: String,
  name: String,
  tags: [String],
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Courses", courseSchema);
// const getCourses = async () => {
//   return await Course.find({ isPublished: true, tags: "Frontend" })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
// };
// // getCourses();
// const run = async () => {
//   const courses = await getCourses();
//   console.log("courses: ", courses);
// };
// run();
// const getCourses = async () => {
//   return await Course.find({
//     isPublished: true,
//     tags: { $in: ["Frontend", "Backend"] },
//   })
//     .sort({ price: -1 }) //we can also ue "-price"
//     .select({ name: 1, author: 1 });
// };
// // getCourses();
// const run = async () => {
//   const courses = await getCourses();
//   console.log("courses: ", courses);
// };
// run();
const getCourses = async () => {
  return await Course.find({
    isPublished: true,
  })
    .or({ price: { $gte: 15 } }, { name: /.*by.*/i })
    .sort({ price: -1 }) //we can also ue "-price"
    .select({ name: 1, author: 1 });
};
// getCourses();
const run = async () => {
  const courses = await getCourses();
  console.log("courses: ", courses);
};
run();
