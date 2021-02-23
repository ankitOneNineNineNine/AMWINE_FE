import React from 'react';
import './SubNavLink.css'

const subLinks = ["Wines", "Beers"];
export default function SubNavLink({SubNavOpen, chooseSubNav, currentSubLink}){    
  
    return (
     
        <div className={"themeNotice " + (!SubNavOpen ? "hidden" : null)}>
          <div className={"subLinks "}>
         <ul>
            {subLinks.map((subLink, i) => {
              return (
                <li
                  key={i}
                  className={currentSubLink === subLink ? "activeSubNav" : null}
                  onClick={() => chooseSubNav(subLink)}
                >
                  {subLink}
                </li>
              );
            })}
          </ul>
          </div>
          </div>
    
    )
}