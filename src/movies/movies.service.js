const knex = require("../db/connection");

// function list() {
//   return knex("movies as m")
//   .select("*")
// }

function list(isShowing) {
  return knex("movies as m")
    .select("m.*")
    .modify((queryBuilder) => {
      if (isShowing) {
        queryBuilder
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id");
      }
    });
}

function read(movieId) {
  return knex("movies as m")
  .select("m.*")
  .where({ movie_id: movieId })
  .first();
}

module.exports = { list, read };