import React from 'react';
import './ProfileDetails.css'
import Wine from '../../../../images/wine.png'


export default function ProfileDetails(){
    return (
        <div className = 'profileContainer'>
        <div className = 'profileDetails'>
            <div className = 'pImageContainer'>
                <img className = 'pImage' src = {Wine} />
            </div>
            <div className = 'pDetailsContainer'>
                <h2>Full Name</h2>
                <p>UserName</p>
                <p>email</p>
                <p>Address</p>
                <p>Phone Number</p>
            </div>
        </div>
        </div>
    )
}