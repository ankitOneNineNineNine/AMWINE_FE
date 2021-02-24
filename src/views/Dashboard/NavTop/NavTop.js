import React from 'react';
import './NavTop.css'
import Wine from '../../../images/wine.png'
import { Link } from 'react-router-dom';
import { profilePicUrl } from '../../../utilities/urls';
export default function NavTop({user, openSideNav, sideNavOpen, match}){

const navTopStyle = {
    justifyContent: 'center',
    width: '100%'
}

    return (
        <div className = ''>
        <div className = 'navTop' style = {!sideNavOpen?navTopStyle: null }>
        <div className = 'sideNavOpen'>
        <i className = 'fa fa-align-right fa-2x' onClick = {()=>{openSideNav()}}></i>
        </div>
            <div className = 'searchBoxDash'>
                <input className = 'dashSearch' type = 'search' placeholder = 'Search your products/ads'/>
                <div className = 'iconContainerSearch'>
                    <i className = 'dashSearchIcon fa fa-search fa-2x'></i>
                    </div>
            </div>
               <Link to  = {match.url}><img className = 'profilePicture' src = {`${profilePicUrl}/${user.image}`||Wine}  /></Link> 


        </div>

    </div>
    )
}