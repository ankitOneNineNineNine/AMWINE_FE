import React from 'react';
import './ProfileDetails.css'
import Wine from '../../../images/wine.png'
import { connect } from 'react-redux';
import { profilePicUrl } from '../../../utilities/urls';

const mapStateToProps = state =>{
    return {
        user: state.user.user
    }
}

function ProfileDetails({user}){
    return (
        <div className = 'profileContainer'>
        <div className = 'profileDetails'>
            <div className = 'pImageContainer'>
                <img className = 'pImage' src = {user.image? user.image : Wine} />
            </div>
            <div className = 'pDetailsContainer'>
                <h2>{user.fullName}</h2>
                <p>{user.userName}</p>
                <p>{user.email}</p>
                <p>{user.address || "No Address Kept"}</p>
                <p>{user.number}</p>
            </div>
        </div>
        </div>
    )
}
export default connect(mapStateToProps)(ProfileDetails);