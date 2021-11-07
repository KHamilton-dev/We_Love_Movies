const knex = require("../db/connection");

function list(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((data) => {
        return Promise.all(data.map((review) => {
            return waitForCritics(review)
        }))
    })
}

function read(reviewId) {
    return knex("reviews as r")
    .select("r.*")
    .where({ review_id: reviewId })
    .first()
}

function getCritics(critic_id){
    return knex("critics")
    .select("*")
    .where({ critic_id: critic_id })
    .first()
}

async function waitForCritics(reviewObject){
    const critic = await getCritics(reviewObject.critic_id)
    const combined = {...reviewObject, critic}
    return combined;
}

function readReviewCritics(review_id) {
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first()
    .then((data)=> waitForCritics(data))
}

function update(updatedReview) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => readReviewCritics(updatedReview.review_id))
}

function destroy(reviewId) {
    return knex("reviews as r")
    .where({ review_id: reviewId })
    .del()
}

module.exports = {
    list,
    read,
    update,
    destroy
}