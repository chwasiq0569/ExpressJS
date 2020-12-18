//Promise.all  it runs multiple promises in parallel its not multiple threading but like concurrency ,, in this we dont need to wait for 1st promsie result  to execute 2nd promise // we we do here just after running promise 1 it executes 2nd promise without wating for result
// if one of the promise is rejected the coombined result will be rejected
const p1 = new Promise((resolve, reject) => {
  resolve(1);
});
const p2 = new Promise((resolve, reject) => {
  resolve(2);
});
Promise.all([p1, p2])
  .then((result) => console.log("result of Promise.all: ", result))
  .catch((err) => console.log("err in Promise.all: ", err));

//in promise.reace the promise should be considered a sresolved as soon as the 1st promise is reolved
//and will return first promise that is resolved
Promise.race([p1, p2])
  .then((result) => console.log("result of Promise.race: ", result))
  .catch((err) => console.log("err in Promise.race: ", err));
