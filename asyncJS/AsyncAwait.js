//by async await we write asyncronus code in a syncronous Way
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

const displayCommits = async () => {
  try {
    const user = await getUser(1);
    console.log("User: ", user);
    const repos = await getRepositories(user.githubUsername);
    console.log("Repos: ", repos);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error in AsyncAwait: ", err);
  }
};
displayCommits();
