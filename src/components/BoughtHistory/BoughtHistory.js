import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, post } from "../../utilities/http";
import "./BoughtHistory.css";
import { productPicUrl } from "../../utilities/urls";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

function BoughtHistory({ user }) {
  const [allBoughts, setAllBoughts] = useState({});
  useEffect(() => {
    const getBought = async () => {
      return new Promise((resolve, reject) => {
        let b = { ...allBoughts };
        user.bought.map(async (boughtID) => {
          let bought = await get(`/bought/${boughtID}`, {}, true);
          let boughtDate = bought.createdAt.slice(0, 10);

          bought.products.map(async (pr) => {
            let product = await get(`product/${pr.product}`);
            let quantityBought = pr.quantity;

            setAllBoughts({
              ...allBoughts,
              [boughtDate]: [
                ...(allBoughts.boughtDate || []),
                {
                  product,
                  quantityBought,
                },
              ],
            });
          });
        });
      });
    };
    getBought();
  }, []);
  let items = Object.keys(allBoughts).map((date) => {
    return (
      <>
        <h3>{date}</h3>
        <hr />
        {allBoughts[date].map((p, i) => {
          return (
            <div className="boughtItems" key={i}>
              <h2>{p.product.name}</h2>
              <span>Bought: {p.quantityBought}</span>
            </div>
          );
        })}
      </>
    );
  });
  return <div className="boughtHistory">{items}</div>;
}

export default connect(mapStateToProps)(BoughtHistory);
