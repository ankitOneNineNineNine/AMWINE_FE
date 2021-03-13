import React, { useEffect, useState } from "react";
import Footer from "../../views/Footer/Footer";
import Contact from "../../views/Home/Contact/Contact";
import ImageText from "../../views/Home/ImageText/Imagetext";
import SeeMoreAdd from "../../views/Home/SeeMoreAdd/SeeMoreAdd";
import './Home.css'
import Slideshow from "../../views/Home/slideShow/Slideshow";
import Ad from "../../views/Ad/Ad";
import { connect } from "react-redux";
import { setProducts } from "../../reduxMgmt/actions/actions";
import { get, post } from "../../utilities/http";



const mapStateToProps = state=>{
  return {
    products: state.product.products,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    saveProductsToState: products=>dispatch(setProducts(products))
  }
}
function Home({products, user, saveProductsToState}) {
  const [ad, setAd] = useState({})
useEffect(()=>{
  window.scrollTo({
    top:0,
  })
  post('/product/search',{
    body: {
      pageNumber: 1,
      itemsToShow: 10
    }
  } )
  .then(({products})=>{
    saveProductsToState(products)
  })
  .catch(console.log)


  get('/ad')
  .then(ad=>{
    setAd(ad)
  })
}, [])
  return (
    <div className = 'home'>
      
      <ImageText />
      <h2>Latest Wine on Stock</h2>
      <Slideshow products = {products} user = {user}/>
      <SeeMoreAdd />
      <Ad ad = {ad|| {}}/>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)