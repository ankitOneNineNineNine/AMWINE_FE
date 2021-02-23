import React from 'react';
import './OpenSubNav.css';

export default function OpenSubNav({SubNavOpen, openSubNav}){
  
    return (
        <div
        className={"openSubNav " + (SubNavOpen ? "close" : "open")}
        onClick={openSubNav}
      >
        {SubNavOpen ? (
          <i className="fa fa-angle-double-up fa-2x"></i>
        ) : (
          <i className="fa fa-angle-double-down fa-2x"></i>
        )}
      </div>
    )
}