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
import { setUser } from "./reduxMgmt/actions/user.actions";
import { post } from "./utilities/http";
import { connect } from "react-redux";
import AdminSignin from "./components/AdminSignin/AdminSignin";
import PublicProfile from "./components/PublicProfile/PublicProfile";
import ProfileDetails from "./views/Profile/ProfileDetails/ProfileDetails";

function AdminRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthorized(user) ? (
          <Component {...props} />
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
  return !user ? (
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
    user: state.user,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    saveUserToState: (user) => dispatch(setUser(user)),
  };
};
function App({ saveUserToState, user }) {
  useEffect(() => {
    post("/auth/signin", {
      body: { token: JSON.parse(localStorage.getItem("i_hash")) },
    }).then((details) => {
      saveUserToState(details.user);
    });
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/shop" component={Shop} />
          <PublicRoute exact path="/profile/:link" component={PublicProfile} />
          <PublicRoute path="/shop/1234" component={ProductDetails} />
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
          <Route exact path="/adminLogin" component={AdminSignin} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default connect(mapStateToProps, mapDispathToProps)(App);
