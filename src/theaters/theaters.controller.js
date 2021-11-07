const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reduceProperties = require("../utils/reduce-properties");

const reduceTheatersAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"]
})

async function list(req, res, next) {
    const data = await service.list();
    const reduced = reduceTheatersAndMovies(data)
    res.json({ data: reduced })
}

module.exports = {
    list: asyncErrorBoundary(list),
}