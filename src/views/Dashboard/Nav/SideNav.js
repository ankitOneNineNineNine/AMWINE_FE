import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./SideNav.css";

export default function SideNav({ name, sideNavOpen,currentSideNavLink, match }) {
  
  return (
    <div className="dashNav" style = {sideNavOpen? {left: '0%'}: {left: '-100%'}}>
      <h2> <Link to={`${match.url}`}>Hellow {name}</Link></h2>
      <div className="analytics">
        <h3 className="headingLink">Analytics</h3>
        <ul>
          <Link to={`${match.url}/analytics/sales`}>
            <li className = {currentSideNavLink === '/analytics/sales'?'sideNavLinkActive':null }>Sales</li>
          </Link>
          <Link to={`${match.url}/analytics/reviews`}>
            <li className = {currentSideNavLink === '/analytics/reviews'?'sideNavLinkActive':null }>Reviews</li>
          </Link>
        </ul>
      </div>
      <div className="post">
        <h3 className="headingLink">Post</h3>
        <ul>
          <Link to={`${match.url}/post/addProduct`}>
            <li className = {currentSideNavLink === '/post/addProduct'?'sideNavLinkActive':null }>Add Product</li>
          </Link>
          <Link to={`${match.url}/post/postAds`}>
            <li className = {currentSideNavLink === '/post/postAds'?'sideNavLinkActive':null }>Post Adds</li>
          </Link>
        </ul>
      </div>
      <div className="profile">
        <h3 className="headingLink">Profile</h3>
        <ul>
          <Link to={`${match.url}`}>
            <li className = {currentSideNavLink === ''?'sideNavLinkActive':null }>My Profile</li>
          </Link>
          <Link to={`${match.url}/update`}>
            <li className = {currentSideNavLink === '/update'?'sideNavLinkActive':null }>Update Profile</li>
          </Link>
        </ul>
      </div>
      <div className="admins">
        <ul>
          <Link to={`${match.url}/admins`}>
            <li className = {currentSideNavLink === '/admins'?'sideNavLinkActive':null }>Admins</li>
          </Link>
        </ul>
      </div>
      <Link to= '/'><button className = 'gotoHome'>GoTo Home</button></Link>
    </div>
  );
}
