module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed drop tables")
  return knex("reviews")
    .del()
    .then(() => knex("movies_theaters").del())
    .then(() => knex("critics").del())
    .then(() => knex("movies").del())
    .then(() => knex("theaters").del());
};
