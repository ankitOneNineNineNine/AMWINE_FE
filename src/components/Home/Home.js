import React, { useState } from "react";
import Footer from "../../views/Footer/Footer";
import Contact from "../../views/Home/Contact/Contact";
import ImageText from "../../views/Home/ImageText/Imagetext";
import SeeMoreAdd from "../../views/Home/SeeMoreAdd/SeeMoreAdd";
import './Home.css'
import Slideshow from "../../views/Home/slideShow/Slideshow";
import Ad from "../../views/Ad/Ad";
import { connect } from "react-redux";



const mapStateToProps = state=>{
  return {
    products: state.product.products,
    user: state.user.user
  }
}
function Home({products, user}) {

  return (
    <div className = 'home'>
      
      <ImageText />
      <h2>Latest Wine on Stock</h2>
      <Slideshow products = {products} user = {user}/>
      <SeeMoreAdd />
      <Ad />

    </div>
  );
}

export default connect(mapStateToProps)(Home)