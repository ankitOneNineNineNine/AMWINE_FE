import React from 'react';
import './ReviewAnalytics.css';

export default function ReviewsAnalytics(){
    return (
        <div className = 'reviewAnalytics'>
            <h2>Following Reviews are recieved in respective products</h2>

<div className = 'reviews'>
          <div className = 'productReview'>
          <h3>Product Name</h3>
            <ul>
                <li className = 'userReviews'>
                    <h4>Ankit Pradhan</h4>
                    <p>Good Tastes Good</p>
                </li>
                 <li className = 'userReviews'>
                    <h4>Ankit Pradhan</h4>
                    <p>Good Tastes Good</p>
                </li>
            </ul>
          </div>
</div>


        </div>
    )
}