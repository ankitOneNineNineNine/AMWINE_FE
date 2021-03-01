import React from "react";
import Product from "../../ProductView/Product/Product";
import Slider from "react-slick";
import "./Slideshow.css";
import NextArrow from "../../Arrows/NextArrow";
import PrevArrow from "../../Arrows/PrevArrow";

export default function Slideshow({
  user,
  products,
  next,
  prev,
  currentSlide,
}) {
  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
  
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
        },
      },
    ],
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {products.map((product, i) => {
          return <Product key={i} user={user} product={product} />;
        })}
      </Slider>
    </div>
  );
}
