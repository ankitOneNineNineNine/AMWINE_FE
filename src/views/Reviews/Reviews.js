import React from "react";
import "./Reviews.css";
import StarRatingComponent from "react-star-rating-component";
import { get } from "../../utilities/http";
import Wine from "../../images/wine.png";
import { profilePicUrl } from "../../utilities/urls";

export default function Reviews({
  reviews = [],
  reviewUsers = [],
  reviewRating,
  setReviewRating,
  postReview,
  reviewTextChange,
}) {
  return (
    <>
      {localStorage.getItem("i_hash") ? (
        <div className="reviewsPostContainer">
          <h2>Post your review</h2>
          <span className="starRating">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={reviewRating}
              onStarHover={(nextValue) => setReviewRating(nextValue)}
              onStarClick={(nextValue) => setReviewRating(nextValue)}
            />
          </span>
          <textarea
            rows={5}
            cols={30}
            placeholder="Please give the review..."
            type="text"
            className="postReview"
            onChange={reviewTextChange}
          />
          <button className="postReviewButton" onClick={postReview}>
            Post
          </button>
        </div>
      ) : null}
      {reviews.length ? (
        <div className="reviewShow">
          <h2>Reviews by Our Customer</h2>
          {reviews.map((review, i) => {
            return (
              <div className="reviewIndividual" key={i}>
                <img
                  className="addedByReview"
                  src={
                    reviewUsers[i]
                      ? reviewUsers[i].image
                        ? `${profilePicUrl}/${reviewUsers[i].image}`
                        : Wine
                      : Wine
                  }
                />
                <div className="details">
                  <span className="personName">
                    {reviewUsers[i] ? reviewUsers[i].fullName : "Anonymous"}
                  </span>
                  <span>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={review.rating}
                    />
                  </span>
                  <div>{review.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
