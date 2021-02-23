import React from "react";
import "./MainNavLink.css";
import { authLinks, links } from "../../../utilities/links";
import { Link } from "react-router-dom";

import Wine from "../../../images/wine.png";


function MainNavLink({user, setShowMenu, showMenu, currentLink,signOut }) {
  let mapLinks = Object.keys(user).length ? authLinks : links;

  return (
    <>
      <div className="links">
        <ul>
          {mapLinks.map((link, i) => {
            return link === "Profile" ? (
              <Link to={"/" + link} key={i}>
                <li className={currentLink === link ? "activeMainNav" : null}>
                  <img className="publicProfile" src={Wine} />
                </li>
              </Link>
            ) : (
              <Link to={"/" + link} key={i}>
                <li className={currentLink === link ? "activeMainNav" : null}>
                  {link}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {showMenu ? (
        <div className="menu">
          <ul>
            {mapLinks.map((link, i) => {
              return (
                <Link to={"/" + link} key={i}>
                  <li className={currentLink === link ? "activeMainNav" : null}  onClick = {()=> {setShowMenu(false)}}>
                    {link}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      ) : null}


     {Object.keys(user).length ? 
      <div className = 'logoutFloat' onClick = {signOut}>
      <button>Sign Out</button>
    </div>
    :null}
    </>
  );
}

export default (MainNavLink)