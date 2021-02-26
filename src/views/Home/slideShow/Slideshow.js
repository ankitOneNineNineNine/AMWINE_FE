import React from "react";
import Product from "../../ProductView/Product/Product";
import Slider from "react-slick";
import "./Slideshow.css";
import NextArrow from "../../Arrows/NextArrow";
import PrevArrow from "../../Arrows/PrevArrow";

export default function Slideshow({user, products, next, prev, currentSlide }) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {products.map((product, i) => {
          return <Product key={i} user = {user} product={product} />;
        })}
      </Slider>
    </div>
  );
}
