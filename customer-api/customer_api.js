const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); //middleware

mongoose
  .connect("mongodb://localhost/customerAPI")
  .then(() => console.log("Connection Established..."))
  .catch((err) => console.log("Error Occured in connecting db: ", err.message));

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

app.get("/customers", async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 });
  res.send(customer);
});

app.post("/customers", (req, res) => {
  const createCustomer = async () => {
    const customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });
    try {
      const result = await customer.save();
      console.log("Result: ", result);
      res.send(result);
    } catch (err) {
      console.log("Error Occured in Creating Customer: ", err.message);
    }
  };
  createCustomer();
});

app.put("/customer/:id", async (req, res) => {
  const result = await Customer.findByIdAndUpdate(req.params.id, {
    $set: {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    new: true,
  });
  res.send(result);
});

app.delete("/customer/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with given ID doesnt exists");
  res.send(customer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to Port ${port}`));
