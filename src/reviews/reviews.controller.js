const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    res.locals.reviewId = reviewId;
    const foundReview = await service.read(reviewId);
    if (foundReview === undefined) {
        return next({
            status: 404,
            message: "Review cannot be found."
        })
    }
    return next();
}

const validFields = new Set([
    "score",
    "content"
])

function hasValidFields(req, res, next) {
    const { data: {} } = req.body;

    const invalidFields = Object.keys(data).filter(
        (field) => !validFields.has(field)
    );

    if (invalidFields.length)
    return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
    next();
}

async function list(req, res, next) {
    const {movieId} = req.params;
    const data = await service.list(movieId);
    res.json({ data })

    /*
    let serviceFunction = movieId ? servicelistReviewsForMovie : service.list;
    const data = serviceFunction(movieId)
    */
}

async function read(req, res, next) {
    const data = await service.read(res.locals.reviewId)
    res.json({ data: data })
}

async function update(req, res, next) {
    const updatedReview = { 
        ...req.body.data,
        review_id: res.locals.reviewId
    }
    const data = await service.update(updatedReview)
    res.json({ data: data })
}

async function destroy(req, res, next) {
    res.sendStatus(204);
    return await service.destroy(res.locals.reviewId)
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [reviewExists, asyncErrorBoundary(read)],
    update: [reviewExists, asyncErrorBoundary(update)],
    destroy: [reviewExists, asyncErrorBoundary(destroy)]
}