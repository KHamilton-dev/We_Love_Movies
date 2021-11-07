const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  res.locals.foundMovie = foundMovie;
  if (foundMovie === undefined) {
      return next({
          status: 404,
          message: "Movie cannot be found."
      })
  }
  return next();
}

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.foundMovie });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [movieExists, asyncErrorBoundary(read)],
};
