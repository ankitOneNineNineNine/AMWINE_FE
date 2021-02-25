import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Product from "../Product/Product";
import { connect } from "react-redux";
import { productPicUrl } from "../../../utilities/urls";
import { setCart } from "../../../reduxMgmt/actions/actions";
import {
  successNotification,
  warningNotification,
} from "../../../utilities/toast";

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
  };
};
function ProductDetails({ products, user, match, cart_p, saveCartPToState }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSelectedImage, setCurrentSelectedImage] = useState(null);
  useEffect(() => {
    let tProduct = products.filter(
      (product) => product._id === match.params.id
    )[0];
    if (tProduct) {
      setProduct(tProduct);
      setCurrentSelectedImage(tProduct.images[0]);
    }
    if (product) setLoading(false);
  });

  const nextImageSelect = (i) => {
    setCurrentSelectedImage(product.images[i]);
  };
  const addToCart = (p_id) => {
    if (cart_p.indexOf(p_id) > -1) {
      warningNotification("Already in the cart");
      return;
    }

    let item = cart_p;
    item.push(p_id);
    if (!Object.keys(user).length) {
      localStorage.setItem("cart_p", JSON.stringify(item));
    }
    saveCartPToState(item);
    successNotification("Addedd to cart");
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
            onClick={() => addToCart(product._id)}
            style={
              cart_p.indexOf(product._id || -1) > -1
                ? { backgroundColor: "var(--main-color)", color: "white" }
                : null
            }
          >
            {cart_p.indexOf(product._id || -1) > -1
              ? "Already in Cart"
              : "Add to Cart"}
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
