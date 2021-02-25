import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import {productPicUrl} from '../../../utilities/urls'
import {isAuthorized} from '../../../utilities/auth.middleware'
export default function Product({ product, user}) {
  const { name, price, image, avail, url} = product;
  const productURL = '/shop/' + url;
 const picUrl = productPicUrl+'/'+product.images[0]
  return (

    <div className="product">
          <Link to = {productURL}>
      <div className="imageContainer">
        <div
          className="bgImage"
          style={{
            backgroundImage: product.images.length?"url(" + picUrl + ")": null,
          }}
        ></div>
      </div>
      </Link>
      <div className="desc">
      <Link to = {productURL}>  <h2 className="productName">{name}</h2>  </Link>
        <div className="descrip">
          <span className="productPrice">Price: NRs. {price}</span>
          {
            isAuthorized(user)?
   
           <Link to  = {`admin/post/updateProduct/${product._id}`}>
              <button className="updateButton">
              Update
            </button>
           </Link>
         
            :
            <div className="addToCart" onClick = {console.log}>
            <input type="number" defaultValue="0" min = '0' max = {product.quantity} />
            <button className="addToCartButton">
              <i className="fa fa-cart-plus fa-2x"></i>
            </button>
          </div>
          }
        </div>
      </div>
    </div>

  );
}
