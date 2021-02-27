import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Product from "../Product/Product";
import { connect } from "react-redux";
import { productPicUrl } from "../../../utilities/urls";
import { setCart, setUser } from "../../../reduxMgmt/actions/actions";
import {
  failureNotification,
  successNotification,
  warningNotification,
} from "../../../utilities/toast";
import { get, put } from "../../../utilities/http";
import { isAuthorized } from "../../../utilities/auth.middleware";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    user: state.user.user,
    cart_p: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveCartPToState: (products) => dispatch(setCart(products)),
    saveUserToState: user=>dispatch(setUser(user))
  };
};
function ProductDetails({ products, user, match, cart_p,saveUserToState, saveCartPToState }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSelectedImage, setCurrentSelectedImage] = useState(null);
  useEffect(() => {
    get(`/product/${match.params.id}`)
      .then((tP) => {
        setProduct(tP);
        setCurrentSelectedImage(tP.images[0]);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  const nextImageSelect = (i) => {
    setCurrentSelectedImage(product.images[i]);
  };
  const addToCart = async(p) => {
    if (cart_p.findIndex(pr=>pr._id === p._id)>-1) {
      warningNotification("Already in the cart");
      return;
    }
    let item = cart_p;
    item.push(p);
    if (!Object.keys(user).length) {
      localStorage.setItem("cart_p", p._id);      
    saveCartPToState(item);
    successNotification("Addedd to cart");
    } else {
      let formData = new FormData();
      formData.append('cart',  p._id);
      formData.append('action', 'add')
     try{
      let user = await put(
        "/user",
        { body :formData},
        true,
        "multipart/form-data"
      );
      saveUserToState(user);    
      saveCartPToState(item);
      successNotification("Addedd to cart");
     }
     catch(e){
       failureNotification('Some Error Occured')
       return;
     }
    }

  };
  console.log(loading);
  if (loading) {
    return null;
  }
  return (
    <div className="productDetails">
      <div className="aboutProduct">
        <div className="dImageContainer">
          <div className="selectedDImage">
            <img
              src={`${productPicUrl}/${currentSelectedImage}`}
              className="dImage"
            />
          </div>
          <div className="otherImagesContainer">
            {product &&
              product.images.map((image, i) => {
                return (
                  <img
                    key={i}
                    onClick={() => nextImageSelect(i)}
                    src={`${productPicUrl}/${image}`}
                    className="otherDImage"
                  />
                );
              })}
          </div>
        </div>
        <div className="ddetails">
          <h2>{product && product.name}</h2>
          <hr />
          <h3>Price: Nrs. {product && product.price}</h3>
          <h4>Type: {product && product.pType}</h4>
          <h5>Variety: {product && product.variety}</h5>
          <hr />
          <button
            onClick={() => addToCart(product)}
            style={
              cart_p.findIndex((p) => p._id === product._id) > -1
                ? { backgroundColor: "var(--main-color)", color: "white" }
                : null
            }
          >
            {cart_p.findIndex((p) => p._id === product._id) > -1
              ? "Already in Cart"
              : "Add to Cart"}
              
          </button>

          <hr />
          {
            isAuthorized(user)?
            <Link to={`/admin/post/updateProduct/${product._id}`}>
              <button
            >
              Update
            </button>
              </Link>
            :null
          }
          <hr />
        </div>
      </div>
      <div className="otherProducts">
        <h2>Similar Products</h2>
        {products.map((pLocal, i) => {
          if (product && product._id !== pLocal._id) {
            if (
              product.type === pLocal.type ||
              product.variety === pLocal.variety
            ) {
              return <Product user={user} key={i} product={pLocal} />;
            } else {
              return <h3 key={i}>No other Similar Products Found</h3>;
            }
          } else {
            return <h3 key={i}>No other Similar Products Found</h3>;
          }
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
