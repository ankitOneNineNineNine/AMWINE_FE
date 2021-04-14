import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, post } from "../../utilities/http";
import "./BoughtHistory.css";
import { productPicUrl } from "../../utilities/urls";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

function BoughtHistory({ user }) {
  const [allBoughts, setAllBoughts] = useState({});
  const [updated, setUpdated] = useState(false);

  const getAllBougt = () => {
    return new Promise((resolve) => {
      user.bought.map(async (bought, i) => {
        let bts;
        let b = await get(`/bought/${bought}`, {}, true);
        let date = b.createdAt.slice(0, 10);
        b.products.map(async (pr) => {
          let product = await get(`/product/${pr.product}`);
          bts = allBoughts;
          bts[date] = [
            ...(bts[date] || []),
            {
              product,
              boughtQuantity: pr.quantity,
            },
          ];
          if (i + 1 === user.bought.length) {
            resolve(bts);
          }
        });
      });
    });
  };
  useEffect(() => {
    getAllBougt().then((data) => {
      setAllBoughts((allBoughts) => data);
      setTimeout(() => {
        setUpdated(true);
      }, 20);
    });
  }, []);
  let items = Object.keys(allBoughts).map((date) => {
    return (
      <>
        <h3>{date}</h3>
        <hr />
        {allBoughts[date].map((p, i) => {
          return (
            <Link to={`/shop/${p.product._id}`}>
              <div
                className="boughtItems"
                key={i}
                style={{
                  backgroundImage: `url(${productPicUrl}/${p.product.images[0]})`,
                  backgroundSize: "cover",
                }}
              >
                <h2>{p.product.name}</h2>
                <span>Bought: {p.boughtQuantity}</span>
              </div>
            </Link>
          );
        })}
      </>
    );
  });
  return <div className="boughtHistory">{items}</div>;
}

export default connect(mapStateToProps)(BoughtHistory);
