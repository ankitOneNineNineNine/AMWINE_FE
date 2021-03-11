import React, { useEffect, useState } from "react";
import Logo from "../../views/Navbar/Logo/Logo";
import "./Navbar.css";
import MainNavLink from "../../views/Navbar/MainNavLink/MainNavLink";
import HamburgerMenu from "../../views/Navbar/HamburgerMenu/HamburgerMenu";
import { useLocation, withRouter } from "react-router-dom";
import { setUser } from "../../reduxMgmt/actions/actions";


import { connect } from "react-redux";
import { get, post } from "../../utilities/http";
import { failureNotification, successNotification } from "../../utilities/toast";
let scrolledNav = {
  backgroundColor: "var(--main-color)",
  boxShadow: " 0 0 15px white",
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(setUser({})),
  };
};

function Navbar(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLink, setCurrentLink] = useState("/");
  const [styleNav, setStyleNav] = useState({ backgroundColor: "transparent" });
  const openOrClose = (e) => {
    e.preventDefault();
    setShowMenu((showMenu) => !showMenu);
  };
  const signOut = (e) => {
    let token = JSON.parse(localStorage.getItem("i_hash"));

    post("/auth/logout", {body: {token}})
    .then(msg => {
      
      successNotification(msg)
      localStorage.clear();
      props.onSignOut();
      props.history.push("/");
    
    })
    .catch(err => failureNotification(err))

    
  };
  useEffect(() => {
    let link = props.location.pathname.substring(
      1,
      props.location.pathname.length
    );
    if (link !== "") {
      setStyleNav(scrolledNav);
    }
    setCurrentLink(link);
    window.onscroll = (e) => {
      if (link !== "") {
        setStyleNav(scrolledNav);
      } else {
        if (e.path[1].pageYOffset > 100) {
          setStyleNav(scrolledNav);
        } else {
          setStyleNav({ backgroundColor: "transparent" });
        }
      }
    };
    return () =>{
      setStyleNav(scrolledNav);
    }
  }, [props.location.pathname]);

  return (
    <>

      <nav className="nav" style={styleNav}>
        <Logo />
        <MainNavLink
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          currentLink={currentLink}
          user={props.user}
          signOut={signOut}
        />
        <HamburgerMenu showMenu={showMenu} openOrClose={openOrClose} />
      </nav>
    </>
  );
}
export default withRouter(connect(mapStateToProps, mapDispathToProps)(Navbar));
