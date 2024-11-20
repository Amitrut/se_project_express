const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index"); // this includes both routers

const app = express();

const { PORT = 3001 } = process.env;

// establish moongoose connection to database
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => console.error(err));

// Route Implements
app.use(express.json()); // parse Data before any routers. You will usually need to do this

// temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "6734dab992c33ec1c1a0d4cb", // user id
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log("Running on Port:", PORT);
});
