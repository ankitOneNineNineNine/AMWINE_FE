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
import { get, post, put } from "../../../utilities/http";
import { isAuthorized } from "../../../utilities/auth.middleware";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Reviews from "../../Reviews/Reviews";
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
    saveUserToState: (user) => dispatch(setUser(user)),
  };
};
function ProductDetails({
  products,
  user,
  match,
  cart_p,
  saveUserToState,
  saveCartPToState,
}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSelectedImage, setCurrentSelectedImage] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewUsers, setReviewUsers] = useState([]);
  useEffect(() => {
    get(`/product/${match.params.id}`)
      .then((tP) => {
        setProduct(tP);
        setCurrentSelectedImage(tP.images[0]);
        setLoading(false);
        tP.reviews.forEach(async (rev) => {
          let user = await get(`/userDetails/${rev.addedBy}`);
          let newUsers = reviewUsers;
          newUsers.push(user);
          setReviewUsers(newUsers);
        });
      })
      .catch(console.log);
  }, [reviewUsers]);

  const nextImageSelect = (i) => {
    setCurrentSelectedImage(product.images[i]);
  };
  const addToCart = async (p) => {
    if (cart_p.findIndex((pr) => pr._id === p._id) > -1) {
      warningNotification("Already in the cart");
      return;
    }
    let item = cart_p;
    item.push(p);
    let pIDs = item.map((p) => p._id);
    if (!localStorage.getItem("i_hash")) {
      localStorage.setItem("cart_p", JSON.stringify(pIDs));

      saveCartPToState(item);
      successNotification("Addedd to cart");
    } else {
      let formData = new FormData();
      formData.append("cart", p._id);
      formData.append("action", "add");
      try {
        let user = await put(
          "/user",
          { body: formData },
          true,
          "multipart/form-data"
        );
        saveUserToState(user);
        saveCartPToState(item);
        successNotification("Addedd to cart");
      } catch (e) {
        failureNotification("Some Error Occured");
        return;
      }
    }
  };
  const reviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const postReview = (e) => {
    if (localStorage.getItem("i_hash")) {
      post(
        "/product/review",
        {
          body: {
            rating: reviewRating,
            text: reviewText,
            pId: product._id,
          },
        },
        true
      )
        .then((product) => setProduct(product))
        .catch(console.log);
    } else {
      failureNotification("Please Login First");
    }
  };
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
          <span className="starRating">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={product.reviews.reduce((acc, item)=>acc+item.rating,0)/product.reviews.length}
            />
          </span>
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
          {isAuthorized(user) ? (
            <Link to={`/admin/post/updateProduct/${product._id}`}>
              <button>Update</button>
            </Link>
          ) : null}
          <hr />
        </div>
        <Reviews
          reviews={product.reviews}
          reviewRating={reviewRating}
          reviewUsers={reviewUsers}
          setReviewRating={setReviewRating}
          postReview={postReview}
          reviewTextChange={reviewTextChange}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
