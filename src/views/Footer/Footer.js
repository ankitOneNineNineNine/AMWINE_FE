import React from "react";
import Cart from "../Cart/Cart";
import Contact from "../Home/Contact/Contact";
import "./Footer.css";

export default function Footer() {
  return (
      <div className="footer">
        <Contact />
        <span>© 2020, AMWINE Pvt. Ltd. All rights reserved.</span>
        <Cart />
      </div>
  );
}
