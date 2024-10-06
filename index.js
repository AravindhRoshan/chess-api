const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Models/users");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  console.log("Request body:", req.body);
  UserModel.create(req.body)
    .then((user) => {
      console.log("User created:", user);
      res.json(user);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Error creating user" });
    });
});

app.post("/login", (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Sucess");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("No records found");
    }
  });
});

mongoose
  .connect("mongodb://localhost:27017/chessdb", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
