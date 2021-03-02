import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Link, Route } from "react-router-dom";
import SideNav from "../../views/Dashboard/Nav/SideNav";
import NavTop from "../../views/Dashboard/NavTop/NavTop";
import SalesAnalytics from "../../views/AdminPanel/Analytics/Sales/SalesAnalytics";

import AddProduct from "./Post/AddProduct/AddProduct";
import UpdateProduct from "./Post/UpdateProduct/UpdateProduct";
import PostAds from "./Post/PostAds/PostAds";
import ProfileUpdate from "../Profile/ProfileUpdate/ProfileUpdate";
import ProfileDetails from "../Profile/ProfileDetails/ProfileDetails";

import ProductAnalytics from "../../views/ProductAnalytics/ProductAnalytics";
import Admins from "./Admins/Admins";




export default function AdminPanel({ user, match }) {
  
  const [sideNavOpen, setSideNavOpen] = useState(true);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const handleResize = () => {
    if (window.innerWidth < 500) setSideNavOpen(false);
  };
  const openSideNav = () => {
    setSideNavOpen((sideNavOpen) => !sideNavOpen);
  };
  const postContentsStyle = {
    width: '100%',
    marginLeft: '0'
}

function AdminSubRoute({component:Component, ...rest}){

  return (
    <Route {...rest} render = {(props)=>{
        return (
          <>
        <div className = 'sidenav'>
      <SideNav name={user && user.userName} sideNavOpen={sideNavOpen} match = {match} currentSideNavLink = {rest.path.substring(10, rest.path.length)} />
      </div><div className = 'postContents' style = {!sideNavOpen? postContentsStyle:null}>
      <NavTop openSideNav={openSideNav} user = {user} match = {match} sideNavOpen={sideNavOpen} />
          <div className = 'compContents'>
          <Component {...props}/>
          </div>
      </div>
      
          </>
        )
    }} />
  )
}
  return (
    <div className="adminPanel">
      <AdminSubRoute exact path = {match.url} component = {ProfileDetails} />
      <AdminSubRoute path = {match.url + '/update'} component = {ProfileUpdate} />
      <AdminSubRoute path = {match.url + '/analytics/sales'} component = {SalesAnalytics} />
      <AdminSubRoute path = {match.url + '/analytics/products'} component = {ProductAnalytics} />
      <AdminSubRoute path = {match.url + '/post/addProduct'} component = {AddProduct} />
      <AdminSubRoute path = {match.url + '/post/updateProduct/:id'} component = {UpdateProduct} />
      <AdminSubRoute path = {match.url + '/admins'} component = {Admins} />
      <AdminSubRoute path = {match.url + '/post/postAds'} component = {PostAds} />
      
    </div>
  );
}
