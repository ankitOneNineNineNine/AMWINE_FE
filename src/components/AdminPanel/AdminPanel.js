import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Link, Route } from "react-router-dom";
import SideNav from "../../views/Dashboard/Nav/SideNav";
import NavTop from "../../views/Dashboard/NavTop/NavTop";
import SalesAnalytics from "../../views/AdminPanel/Analytics/Sales/SalesAnalytics";
import ReviewsAnalytics from "../../views/AdminPanel/Analytics/Reviews/Reviews";
import ProfileDetails from "../../views/Profile/ProfileDetails/ProfileDetails";
import ProfileUpdate from "../../views/Profile/ProfileUpdate/ProfileUpdate";
import AddProduct from "../../views/AdminPanel/Post/AddProduct/AddProduct";
import UpdateProduct from "../../views/AdminPanel/Post/UpdateProduct/UpdateProduct";
import PostAds from "../../views/AdminPanel/Post/PostAds/PostAds";


export default function AdminPanel({ name, match }) {
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

function AdminSubRoute({component:Component,user, ...rest}){

  return (
    <Route {...rest} render = {(props)=>{
        return (
          <>
        <div className = 'sidenav'>
      <SideNav name="ankit" sideNavOpen={sideNavOpen} match = {match} currentSideNavLink = {rest.path.substring(10, rest.path.length)} />
      </div><div className = 'postContents' style = {!sideNavOpen? postContentsStyle:null}>
      <NavTop openSideNav={openSideNav} match = {match} sideNavOpen={sideNavOpen} />
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
      <AdminSubRoute path = {match.url + '/analytics/reviews'} component = {ReviewsAnalytics} />
      <AdminSubRoute path = {match.url + '/post/addProduct'} component = {AddProduct} />
      <AdminSubRoute path = {match.url + '/post/updateProduct'} component = {UpdateProduct} />
      <AdminSubRoute path = {match.url + '/post/postAds'} component = {PostAds} />
      
    </div>
  );
}
