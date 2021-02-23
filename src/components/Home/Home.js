import React, { useState } from "react";
import Footer from "../../views/Footer/Footer";
import Contact from "../../views/Home/Contact/Contact";
import ImageText from "../../views/Home/ImageText/Imagetext";
import SeeMoreAdd from "../../views/Home/SeeMoreAdd/SeeMoreAdd";
import './Home.css'
import Slideshow from "../../views/Home/slideShow/Slideshow";
import Ad from "../../views/Ad/Ad";


const product = {
  image: "../../../images/wine2.jpg",
  name: "AM Wine",
  price: "5000",
  avail: 5,
  url: '1234'
};
const products = [product, product, product, product, product,product,product,product];

export default function Home() {

  return (
    <div className = 'home'>
      
      <ImageText />
      <h2>Latest Wine on Stock</h2>
      <Slideshow products = {products}/>
      <SeeMoreAdd />
      <Ad />

    </div>
  );
}
