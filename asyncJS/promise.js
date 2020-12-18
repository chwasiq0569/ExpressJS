const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(1);
    // reject(new Error());
  }, 2000);
});

p.then((result) => console.log("result: ", result)).catch((err) =>
  console.log("err: ", err)
);
function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting Commits from database...");
      if (repos) {
        resolve(["Commit"]);
      }
    }, 2000);
  });
}
function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting Repos from database...");
      if (username === "chwasiq0569") {
        resolve(["repo1", "repo2"]);
      }
    }, 2000);
  });
}
const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting Data from database...");
      resolve({ id: id, githubUsername: "chwasiq0569" });
    }, 2000);
  });
};

getUser(1)
  .then((user) => {
    console.log("User: ", user);
    getRepositories(user.githubUsername)
      .then((repos) => {
        console.log("Repos: ", repos);
        getCommits(repos[0])
          .then((commit) => console.log(commit))
          .catch((err) => console.log("Error Getting Commits: ", err));
      })
      .catch((err) => console.log("Error Getting Repos: ", err));
  })
  .catch((err) => console.log("Error Getting User: ", err));
