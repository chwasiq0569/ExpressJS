console.log("Before");
// const data = getUser(1); //here data will be undefined because the value returned by getUser function after 2 sec is assigned to data and when data is logged it will show undefined because at that is synchronous operation and at that time noting in assigned to data
// console.log(data);
getUser(1, (user) => {
  console.log("User: ", user);
  getRepositories(user.githubUsername, (repos) => {
    console.log("repos: ", repos);
  });
});
console.log("After");
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Getting Data from database...");
    callback({ id: id, githubUsername: "chwasiq0569" });
  }, 2000);
}
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting Repos from database...");
    if (username === "chwasiq0569") {
      callback(["repo1", "repo2"]);
    }
  }, 2000);
}
