import React from 'react';
import { connect } from 'react-redux';
import './Admins.css'

import {isMainAdmin} from '../../../utilities/auth.middleware'
import AddAdmins from '../AddAdmins/AddAdmins';

const mapStateToProps = state =>{
    return {
        user: state.user.user,
    }
}

function Admins({user}){
    
    return (
       <>
        <div className = 'adminsDisplay'>
            <h3>All Admins</h3>
            <div className = 'label'>
                <span>Primary Admin</span>
                <div className = 'primaryAdmin'></div>
                <span>Secondary Admin</span>
                <div className = 'secondaryAdmin'></div>
            </div>
            <ul>
                <li className = 'primaryAdmin'>
                    Ankit Pradhan
                </li>
                <li className = 'secondaryAdmin'>
                    Kiran Musyakhwo
                </li>
                <li>
                    
                </li>
            </ul>
        </div>
      {isMainAdmin(user)?
        <AddAdmins />
        :null  
    }
       </>
    )
}

export default connect(mapStateToProps)(Admins);