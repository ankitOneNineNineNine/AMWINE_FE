import React, { memo } from "react";
import "./MainNavLink.css";
import { authLinks, links } from "../../../utilities/links";
import { Link } from "react-router-dom";
import {isAuthorized} from '../../../utilities/auth.middleware'
import Wine from "../../../images/wine.png";
import { profilePicUrl } from "../../../utilities/urls";



function MainNavLink({user, setShowMenu, showMenu, currentLink,signOut }) {
  let mapLinks = localStorage.getItem('i_hash') ? authLinks : links;

  return (
    <>
      <div className="links">
        <ul>
          {mapLinks.map((link, i) => {
            return link === "Profile" ?  
                isAuthorized(user)?
                (
                  <Link to={`/admin`} key={i}>
                    <li className={currentLink === `/admin` ? "activeMainNav" : null} >
                      <img className="publicProfile" src = {user.image? user.image : Wine}/>
                    </li>
                  </Link>
                ) 
                :
                (
                  <Link to={`/profile/${user._id}`} key={i}>
                    <li className={(currentLink === `profile/${user._id}`) ? "activeMainNav" : null} >
                      <img className="publicProfile" src = {user.image? user.image : Wine}/>
                    </li>
                  </Link>
                ) : (
                  <Link to={"/" + link.toLowerCase()} key={i}>
                    <li className={currentLink === link.toLowerCase() ? "activeMainNav" : null} >
                      {link}
                    </li>
                  </Link>
                )
          })}
        </ul>
      </div>
      {showMenu ? (
        <div className="menu">
          <ul>
            {mapLinks.map((link, i) => {
              return link === "Profile" ?  
              isAuthorized(user)?
              (
                <Link to={`/admin`} key={i}>
                  <li className={currentLink ==='/admin' ? "activeMainNav" : null} onClick = {()=>{setShowMenu()}}>
                  {link}
                  </li>
                </Link>
              ) 
              :
              (
                <Link to={`/profile/${user._id}`} key={i}>
                  <li className={(currentLink === `profile/${user._id}`) ? "activeMainNav" : null} onClick = {()=>{setShowMenu()}}>
                  {link}
                  </li>
                </Link>
              ) : (
                <Link to={"/" + link.toLowerCase()} key={i}>
                  <li className={currentLink === link.toLowerCase() ? "activeMainNav" : null} onClick = {()=>{setShowMenu()}}>
                    {link}
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
      ) : null}


     {localStorage.getItem('i_hash') ? 
      <div className = 'logoutFloat' onClick = {signOut}>
      <button>Sign Out</button>
    </div>
    :null}
    </>
  );
}

export default MainNavLink


