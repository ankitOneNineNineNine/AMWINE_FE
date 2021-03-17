import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, post } from "../../utilities/http";
import "./BoughtHistory.css";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

function BoughtHistory({ user }) {
  const [bought, setBought] = useState(null);
  useEffect(() => {
    user.bought.map((bID) => {
      get(`/bought/${bID}`, {}, true)
        .then((bought) => {
          let dat = bought.createdAt.slice(0, 10);
          bought.products.forEach((pr) => {
            get(`/product/${pr.product}`, {}, true).then((product) => {
              let b = bought;
              let prToPush = {
                product: product,
                quantity: pr.quantity,
              };
              if (b.dat) {
                b[dat] = [...b[dat], prToPush];
              } else {
                b[dat] = [prToPush];
              }
            });
          });
        })
        .catch((err) => console.log(err.response));
    });
  });
  return <div className="boughtHistory">{console.log(bought)}</div>;
}

export default connect(mapStateToProps)(BoughtHistory);
