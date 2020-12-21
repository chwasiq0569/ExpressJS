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
// const getCourses = async () => {
//   return await Course.find({
//     isPublished: true,
//   })
//     .or({ price: { $gte: 15 } }, { name: /.*by.*/i })
//     .sort({ price: -1 }) //we can also ue "-price"
//     .select({ name: 1, author: 1 });
// };
// // getCourses();
// const run = async () => {
//   const courses = await getCourses();
//   console.log("courses: ", courses);
// };
// run();
const updateCoursesQueryFirst = async (id) => {
  //query first approach
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = false;
  course.author = "Wasiq";
  //or course.set({
  //     isPublished = false;
  //     author = "Wasiq"
  //  })
  const updatedCourse = await course.save();
  console.log("updateCoursesQueryFirst: ", updatedCourse);
};

// updateCoursesQueryFirst("5fdeed775f9b7f03e425385f");

const updateCourseUpdateFirst = async (id) => {
  //   const result = await Course.update(
  //     { _id: id },
  //     {
  //       $set: {
  //         author: "Ch Wasiq",
  //         isPublished: false,
  //       },
  //     }
  //   ); //if is insert isPublished: true iw will update all entries with isPublished: true
  //to get entry that is updated use
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "Ch Wasiq",
        isPublished: false,
      },
    }
  );
  console.log("result: ", result);
};

updateCourseUpdateFirst("5fdeed775f9b7f03e425385f");
