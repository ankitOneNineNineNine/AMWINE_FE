import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileDetails from '../Profile/ProfileDetails/ProfileDetails';
import ProfileUpdate from '../Profile/ProfileUpdate/ProfileUpdate';
import CartContents from '../CartContents/CartContents';
import './PublicProfile.css'
import BoughtHistory from '../BoughtHistory/BoughtHistory';

const mapStateToProps = state=>{
    return {
        user:state.user.user
    }
}
function PublicProfile({match, user}){
  
return (
    <div className = 'pProfile'>
        <div className = 'topHandle'>
            <ul>
                <li className = {(match.params.link === user._id)? 'cSL': null}><Link to = {`/profile/${user._id}`}>Profile</Link></li>
                <li className = {(match.params.link === 'update')? 'cSL': null}><Link to = '/profile/update'>Update Profile</Link></li>
                <li className = {(match.params.link === 'boughtHistory')? 'cSL': null}><Link to = '/profile/boughtHistory'>Bought History</Link></li>
                <li><Link to = '/cart'>Cart</Link></li>            </ul>
        </div>
        <div className = 'det'>
        {match.params.link === 'update'? <ProfileUpdate />
        : match.params.link === 'boughtHistory'? <BoughtHistory />
        :<ProfileDetails />
        }
        </div>
    </div>
  
)
}

export default connect(mapStateToProps)(PublicProfile);