import React from "react";
import { Link } from "react-router-dom";

function Theater({ theater }) {
  return (
    <article className="col-12 mb-4">
      <div className="row">
        <aside className="col">
          <h2>{theater.name}</h2>
          <address>
            {theater.address_line_1}
            <br />
            {theater.address_line_2 ? theater.address_line_2 : null}
            {theater.city}, {theater.state} {theater.zip}
          </address>
        </aside>
        <section className="col">
          <div className="row">
            {theater.movies.map((movie) => (
              <div key={movie.movie_id} className="col-3">
                <Link to={`/movies/${movie.movie_id}`}>
                  <h6 className="font-poppins-heading text-center mt-2">
                    {movie.title}
                  </h6>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default Theater;
