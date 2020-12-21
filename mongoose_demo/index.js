const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log("Error Occured: ", err));

const courseScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "frontend", "backend"], //should be one of these
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0; //will return true or false
          callback(result);
        }, 4000);
      },
      message: "A course should have atleast one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseScheme);

const createCourse = async () => {
  const course = new Course({
    name: "ExpressJS Course",
    author: "Ch Wasiq",
    tags: [],
    // date is set to default
    category: "web",
    price: 277,
    isPublished: true,
  });
  try {
    const result = await course.save();
    console.log("result: ", result);
  } catch (err) {
    for (field in err.errors) {
      // we are getting the fields taht getting errors
      // console.log("err.errors[field].message: ", err.errors.tags.message);
      console.log("err.errors[field].message: ", err.errors[field].message);
    }
  }
};

createCourse();

const getCourses = async () => {
  //Comparison Operators
  //gt greaterThan
  //lt lessThan
  //gte greaterThan or equals to
  //lte lessThan or equals to
  //in (array of values [1,55,4])
  //nin (not in)
  //Logical Operators
  //or
  //and
  const courses = await Course
    // .find({ price: {$gte: 10, $lte: 20} }) // between 10 to 20
    // .find({ price: {$in: [1,20,25] }) // in [1,55,4]
    // .find().or([{author: "Mosh"},{isPublished: true}]) // find the course with author == "Mosh" or isPublished: true
    // .find().and([{author: "Mosh"},{isPublished: true}]) // find the course with author == "Mosh" and isPublished: true
    //by adding these values in find function we can also get same result as logical AND
    .find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order
    .select({ name: 1, tags: 1 });
  console.log("course: ", courses);
  ///counting total dataitems in below record
  const countCourses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order
    .count();
  console.log("countCourses: ", countCourses);
  //pagination
  const pageNumber = 2;
  const pageSize = 10;
  const pagination = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) //1 indicates ascending order
    .count();
  console.log("pagination: ", pagination);
};
// getCourses();
