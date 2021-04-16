import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { productPicUrl } from "../../../utilities/urls";
import { isAuthorized } from "../../../utilities/auth.middleware";
import { setCart, setUser } from "../../../reduxMgmt/actions/actions";
import { connect } from "react-redux";
import {
  failureNotification,
  successNotification,
  warningNotification,
} from "../../../utilities/toast";
import { put } from "../../../utilities/http";
const mapStateToProps = (state) => {
  return {
    cart_p: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveCartPToState: (products) => dispatch(setCart(products)),
    saveUserToState:user=>dispatch(setUser(user))
  };
};
function Product({ product, user, saveCartPToState, cart_p,saveUserToState }) {
  const productURL = "/shop/" + product._id;
  const picUrl = product.images[0];

  const addToCart = async (p) => {
    if (cart_p.findIndex((p) => p._id === product._id) > -1) {
      warningNotification("Already in the cart");
      return;
    }

    let item = cart_p;
    item.push(p);
    let pIDs = item.map(p=>p._id)
    if (!localStorage.getItem('i_hash')) {
      localStorage.setItem("cart_p", JSON.stringify(pIDs));
      saveCartPToState(item);
      successNotification("Addedd to cart");
    } else {
      let formData = new FormData();
      formData.append('cart', p._id)
      formData.append('action', 'add')
      try{
        let user = await put(
          "/user",
          { body :formData},
          true,
          "multipart/form-data"
        );
        
        saveUserToState(user)
        saveCartPToState(item);
        successNotification("Addedd to cart");

      }
      catch(e){
        console.log(e.response)
         failureNotification("Error Occured!")
      }


    }
 
  };
  return (
    <div className="product">
      <Link to={productURL}>
        <div className="imageContainer">
          <div
            className="bgImage"
            style={{
              backgroundImage: product.images.length
                ? "url(" + picUrl + ")"
                : null,
            }}
          ></div>
        </div>
      </Link>
      <div className="desc">
        <Link to={productURL}>
          {" "}
          <h2 className="productName">{product.name}</h2>{" "}
        </Link>
        <div className="descrip">
          <span className="productPrice">Price: NRs. {product.price}</span>
          {isAuthorized(user) ? (
            <Link to={`admin/post/updateProduct/${product._id}`}>
              <button className="updateButton">Update</button>
            </Link>
          ) : (
            <div className="addToCart" onClick={() => addToCart(product)}>
              <button
                className="addToCartButton"
                style={
                  cart_p.findIndex((p) => p._id === product._id) > -1
                    ? { backgroundColor: "white", color: "black" }
                    : null
                }
              >
                <i className="fa fa-cart-plus fa-2x"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
