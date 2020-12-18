// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top Movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email Sent...");
//       });
//     });
//   }
// });

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Wasiq Abdullah",
        isGold: true,
      });
    }, 2000);
  });
}
function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Movie1", "Movie2"]);
    }, 2000);
  });
}
function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Send Email");
    }, 2000);
  });
}
// getCustomer(1)
//   .then((customer) => {
//     console.log("Customer: ", customer);
//     getTopMovies(customer.isGold)
//       .then((movies) => {
//         console.log("Movies: ", movies);
//         sendEmail()
//           .then(() => console.log("Email Sent..."))
//           .catch((err) => console.log("Err in sendEmail: ", err));
//       })
//       .catch((err) => console.log("Err in getMovies: ", err));
//   })
//   .catch((err) => console.log("Err in getCustomer: ", err));

const exercise = async () => {
  const customer = await getCustomer(1);
  console.log("Customer: ", customer);
  const movies = await getTopMovies(customer.isGold);
  console.log("Movies: ", movies);
  const sentEmail = await sendEmail();
  console.log(sentEmail);
};

exercise();
