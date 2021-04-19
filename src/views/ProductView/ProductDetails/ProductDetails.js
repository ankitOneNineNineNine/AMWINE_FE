import React, { lazy, memo, Suspense, useEffect, useState } from "react";
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
const Reviews = lazy(() => import("../../Reviews/Reviews"));

const mapStateToProps = (state) => {
  return {
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
  const [reviewUsers, setReviewUsers] = useState({});
  const [submitted, setSubmitted] = useState(false)

  const getAllReviews = (tP) => {
    return new Promise((resolve) => {
      let revUsers = reviewUsers;
      tP.reviews.forEach(async (rev, i) => {
        let u = await get(`/userDetails/${rev.addedBy}`);
        reviewUsers[rev.addedBy] = u;

        if (i + 1 === tP.reviews.length) {
          resolve(revUsers);
        }
      });
    });
  };
  useEffect(() => {
    const saveProduct = async () => {
      let tP = await get(`/product/${match.params.id}`);
      setProduct(tP);
      setCurrentSelectedImage(tP.images[0]);
      if (tP.reviews.length) {
        let a = await getAllReviews(tP);
        setReviewUsers(a);
        setTimeout(() => {
          setLoading(false);
        }, 30);
      } else {
        setLoading(false);
      }
    };
    saveProduct();
  }, []);

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
    setSubmitted(true);
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
        .then((product) => {
          setSubmitted(false)
          setProduct(product);
          let u = reviewUsers;
          u.push(user);
          setReviewUsers(u);
        })
        .catch(err=>{
          setSubmitted(true);
          console.log(err)
        });
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
              src={currentSelectedImage}
              className="dImage"
              alt="productPic Current"
            />
          </div>
          <div className="otherImagesContainer">
            {product &&
              product.images.map((image, i) => {
                return (
                  <img
                    key={i}
                    alt="product pic"
                    onClick={() => nextImageSelect(i)}
                    src = {image}
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
              value={
                product.reviews.reduce((acc, item) => acc + item.rating, 0) /
                product.reviews.length
              }
            />
          </span>
          <hr />
          <h3>Price: Nrs. {product && product.price}</h3>
          <h4>Type: {product && product.pType}</h4>
          <h5>Variety: {product && product.variety}</h5>
          <span>
            {product.quantity - (product.sold || 0)} remaining in stock
          </span>
          <hr />
          {product.quantity - (product.sold || 0) > 0 ? (
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
          ) : null}

          <hr />
          {isAuthorized(user) ? (
            <Link to={`/admin/post/updateProduct/${product._id}`}>
              <button>Update</button>
            </Link>
          ) : null}
          <hr />
        </div>
        <Suspense fallback={<h1>Loading</h1>}>
          <Reviews
            reviews={product.reviews}
            reviewRating={reviewRating}
            reviewUsers={reviewUsers}
            setReviewRating={setReviewRating}
            postReview={postReview}
            reviewTextChange={reviewTextChange}
            submitted = {submitted}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
