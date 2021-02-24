import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileDetails from '../../views/Profile/ProfileDetails/ProfileDetails';
import ProfileUpdate from '../../views/Profile/ProfileUpdate/ProfileUpdate';
import CartContents from '../CartContents/CartContents';
import './PublicProfile.css'

const mapStateToProps = state=>{
    return {
        user:state.user
    }
}
function PublicProfile({match, user}){
  
return (
    <div className = 'pProfile'>
        <div className = 'topHandle'>
            <ul>
                <li className = {(match.params.link === user._id)? 'cSL': null}><Link to = {`/profile/${user._id}`}>Profile</Link></li>
                <li className = {(match.params.link === 'update')? 'cSL': null}><Link to = '/profile/update'>Update Profile</Link></li>
                <li><Link to = '/cart'>Cart</Link></li>            </ul>
        </div>
        <div className = 'det'>
        {match.params.link === 'update'? <ProfileUpdate />
        :<ProfileDetails />
        }
        </div>
    </div>
  
)
}

export default connect(mapStateToProps)(PublicProfile);