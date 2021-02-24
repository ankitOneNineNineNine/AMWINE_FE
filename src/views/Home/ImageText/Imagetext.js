import React from 'react';
import { Link } from 'react-router-dom';
import './Imagetext.css';


export default function ImageText(){
    return (
        <div className="newsBefore">
        <div className="newsText">
          <h2>ANKIT WINE SHOP</h2>
          <p>Join us to get Special Discounts!!</p>
          <Link to = '/join' className = 'JoinButtonBelow'>Join</Link>
        </div>
      </div>
    )
}