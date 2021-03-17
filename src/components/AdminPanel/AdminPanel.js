import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Link, Route } from "react-router-dom";
import SideNav from "../../views/Dashboard/Nav/SideNav";
import NavTop from "../../views/Dashboard/NavTop/NavTop";


import AddProduct from "./Post/AddProduct/AddProduct";
import UpdateProduct from "./Post/UpdateProduct/UpdateProduct";
import PostAds from "./Post/PostAds/PostAds";
import ProfileUpdate from "../Profile/ProfileUpdate/ProfileUpdate";
import ProfileDetails from "../Profile/ProfileDetails/ProfileDetails";

import ProductAnalytics from "../../views/AdminPanel/Analytics/ProductAnalytics/ProductAnalytics";
import Admins from "./Admins/Admins";
import { setProducts } from "../../reduxMgmt/actions/actions";
import { connect } from "react-redux";
import { get } from "../../utilities/http";
import BoughtHistory from "../BoughtHistory/BoughtHistory";

const mapStateToProps = state => {
  return {
    products: state.product.products,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    saveProductToState: products => dispatch(setProducts(products))
  }
}

function AdminPanel({ products, saveProductToState, user,history, match}) {
  const [pageNumber, setPageNumber] = useState(1);

  const [totalP, settotalP] = useState(0)
  const [sideNavOpen, setSideNavOpen] = useState(true);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    get(`/product?pageNumber=${pageNumber}&itemsToShow=10`, {}, true)
    .then(({products, count})  => {
      saveProductToState(products);
      settotalP(count)
    })
    .catch(console.log)
  }, [pageNumber]);

const changePageNumber = (action) =>{
  if(action === 'next'){
      if(pageNumber !== Math.ceil(totalP/10)){
          setPageNumber(pageNumber=>pageNumber+1)
      }
      else{
        setPageNumber(pageNumber=>pageNumber)
      }
  }
  else{
    if(pageNumber!==1){
      setPageNumber(pageNumber=>pageNumber-1)
  }
  else{
    setPageNumber(pageNumber=>1)
  }
  }
}
  const handleResize = () => {
    if (window.innerWidth < 500) setSideNavOpen(false);
  };
  const openSideNav = () => {
    setSideNavOpen((sideNavOpen) => !sideNavOpen);
  };

  const goToProduct = id => {
    history.push(`/shop/${id}`)
  }
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
      <SideNav name={user && user.userName} sideNavOpen={sideNavOpen} match = {match} currentSideNavLink = {rest.path.substring(6, rest.path.length)} />
      </div><div className = 'postContents' style = {!sideNavOpen? postContentsStyle:null}>
      <NavTop openSideNav={openSideNav} user = {user} match = {match} sideNavOpen={sideNavOpen} />
          <div className = 'compContents'>
          <Component {...props} products = {products} changePageNumber = { changePageNumber} goToProduct = {goToProduct} max = {pageNumber === Math.ceil(totalP/10)} min = {pageNumber === 1} />
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
      <AdminSubRoute path = {match.url + '/analytics/products'} component = {ProductAnalytics}/>
      <AdminSubRoute path = {match.url + '/post/addProduct'} component = {AddProduct} />
      <AdminSubRoute path = {match.url + '/post/updateProduct/:id'} component = {UpdateProduct} />
      <AdminSubRoute path = {match.url + '/admins'} component = {Admins} />
      <AdminSubRoute path = {match.url + '/post/postAds'} component = {PostAds} />
      <AdminSubRoute path = {match.url + '/boughtHistory'} component = {BoughtHistory} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)