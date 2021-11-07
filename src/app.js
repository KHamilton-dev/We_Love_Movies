require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
  next({ status: 404, message: `Not Found: ${req.originalurl}` });
});

app.use((error, req, res, next) => {
  // console.error(error);
  const { status = 500, message = `Something went wrong!` } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
