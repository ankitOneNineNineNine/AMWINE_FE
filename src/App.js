import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./views/Footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import ProductDetails from "./views/ProductView/ProductDetails/ProductDetails";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { isAuthorized } from "./utilities/auth.middleware";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { setCart, setProducts, setUser } from "./reduxMgmt/actions/actions";
import { get, post } from "./utilities/http";
import { connect } from "react-redux";
import PublicProfile from "./components/PublicProfile/PublicProfile";
import CartContents from "./components/CartContents/CartContents";

function AdminRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthorized(user) ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}
function PublicRoute({ component: Component, isAdmin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Navbar />
            <Component {...props} />
            <Footer />
          </>
        );
      }}
    />
  );
}
function PublicAuth({ component: Component, user, ...rest }) {
  return !localStorage.getItem('i_hash') ? (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Navbar />
            <Component {...props} />
          </>
        );
      }}
    />
  ) : (
    <Redirect to="/" />
  );
}

//redux
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cart_p: state.cart.products
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    saveUserToState: (user) => dispatch(setUser(user)),
    saveProductToState: products=>dispatch(setProducts(products)),
    saveCartPToState: products =>dispatch(setCart(products))
  };
};
function App({ saveUserToState, cart_p, user, products , saveProductToState, saveCartPToState}) {
  useEffect(() => {
    if(localStorage.getItem('i_hash')){
      get("/user", {}, true)
      .then((user) => {
        saveUserToState(user);
        console.log('cart', user.cart)
        let  products = [];
        user.cart.forEach(p_id=>{
        get(`/product/${p_id}`)
        .then(p=>{
          products.push(p);
          saveCartPToState([...cart_p, p])
        })
        .catch(console.log)
        })
      })
      .catch(console.log);
    }
    else{
      let item = JSON.parse(localStorage.getItem('cart_p'));
  
      let  products = [];
      if(item && item.length){
        item.forEach(p_id=>{
        get(`/product/${p_id}`)
        .then(p=>{
          products.push(p);
          saveCartPToState(p)
        })
        .catch(console.log)
        })
      
  
    }
    }
  }, []);
  useEffect(() => {}, [user]);
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/shop" component={Shop} />
          <PublicRoute exact path="/profile/:link" component={PublicProfile} />
          <PublicRoute path="/cart" component={CartContents} />
          <PublicRoute path="/shop/:id" component={ProductDetails} />
          <PublicRoute path="/about" component={About} />
          {/* <PublicRoute path="/about" component = {About} /> */}
          <AdminRoute path="/admin" component={AdminPanel} user={user} />
          <PublicAuth path="/login" component={Login} user={user} />
          <PublicAuth path="/join" component={Register} user={user} />
          <PublicAuth
            path="/forgot-password"
            component={ForgotPassword}
            user={user}
          />
          {/* <Route exact path="/adminLogin" component={AdminSignin} /> */}
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default connect(mapStateToProps, mapDispathToProps)(App);
