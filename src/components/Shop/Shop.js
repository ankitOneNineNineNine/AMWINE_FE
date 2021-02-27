import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setFilter, setProducts } from "../../reduxMgmt/actions/actions";
import { get, post } from "../../utilities/http";
import Product from "../../views/ProductView/Product/Product";
import Filter from "../../views/Shop/Filter/Filter";
import Search from "../../views/Shop/Search/Search";
import "./Shop.css";

export const SearchContext = React.createContext(null)

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    user: state.user.user,
    filterDetails: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductsToState: (products) => dispatch(setProducts(products)),
    saveFilterDetailsToState: (details) => dispatch(setFilter(details)),
  };
};
const defaultF = {
  type: [],
  variety: [],
  min: 0,
  max: 0,
  name: ""
}
function Shop({
  products,
  user,
  saveProductsToState,
  filterDetails,
  cart_p,
  saveFilterDetailsToState,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(filterDetails);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    post("/product/search", {
      body: {
        pageNumber: pageNumber,
        itemsToShow:6,
        ...filterDetails
      },
    }).then((products) => {
      saveProductsToState(products);
      if (!products.length) {
        setPageNumber(1);
      }
    });
  }, [pageNumber]);

  const filterChange = (e) => {
    let { name, value, checked, type } = e.target;
    
    if (type === "checkbox") {
      let pType = filterDetails.type;
      let variety = filterDetails.variety;

      if (name === "type") {
        if (checked) {
          pType.push(value);
        } else {
          pType.splice(pType.indexOf(value), 1);
        }
      } else {
        if (checked) {
          variety.push(value);
        } else {
          variety.splice(variety.indexOf(value), 1);
        }
      }
      saveFilterDetailsToState({
        ...filterDetails,
        type: pType,
        variety: variety,
      });
    } else {
      saveFilterDetailsToState({ ...filterDetails, [name]: value });
    }
  };
  const filter = (e) => {
    post("/product/search", { body: {
      ...filterDetails, 
      pageNumber,
      itemsToShow:6,
    }})
      .then((products) => {
        
        saveProductsToState(products);
      })
      .catch((err) => console.log(err));
  };
  const searchChange = e=>{
    
    setSearchText(e.target.value)
  }
  const search = e =>{
    saveFilterDetailsToState({...defaultF, name: searchText})
    setPageNumber(1)
    post("/product/search", { body: {
      ...defaultF, name: searchText, 
      pageNumber:1,
      itemsToShow:6,
    }})
      .then(({products}) => {
        saveProductsToState(products);
      })
      .catch((err) => console.log(err));
  }
 
  return (
    <div className="shop">
      <div className="filterSub"></div>
      <div className="filterC">
      <SearchContext.Provider value = {{
        searchChange,
        search
      }}>
        <Filter filter={filter} filterChange={filterChange} />
      </SearchContext.Provider>
      </div>
      <div className="filterContainer"></div>
      <div className="productCollection">
        <div className="detailPlusSort">
          <h3>Showing {products && products.length} results</h3>
        </div>
        {products.map((product, i) => {
          return <Product user={user} key={i} product={product} />;
        })}
        <div className="pageNumberShow">Page: {pageNumber}</div>
        <div className="paginateButtons">
          <button
            onClick={() =>
              setPageNumber((pageNumber) =>
                pageNumber === 1 ? 1 : pageNumber - 1
              )
            }
          >
            Prev
          </button>
          <button onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
