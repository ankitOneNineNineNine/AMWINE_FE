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
  const [totalProducts, setTotalProducts] = useState(0);
  const [varieties, setVarieties] = useState([])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    get('/product/pr/varieties')
    .then(varieties=>{
      setVarieties(varieties)
    })
    post("/product/search", {
      body: {
        pageNumber: pageNumber,
        itemsToShow:5,
        ...filterDetails
      },
    }).then(({products, count}) => {
      setTotalProducts(count)
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
      itemsToShow:5,
    }})
      .then(({products, count}) => {
        console.log(products, count)
        setTotalProducts(count)
        
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
      itemsToShow:5,
    }})
      .then(({products, count}) => {
        saveProductsToState(products);
        setTotalProducts(count)
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
        <Filter filter={filter} filterChange={filterChange} varieties = {varieties} />
      </SearchContext.Provider>
      </div>
      <div className="filterContainer"></div>
      <div className="productCollection">
        <div className="detailPlusSort">
        <div className="pageNumberShow">Page: {pageNumber}</div>
          <h3>Showing {products && products.length} of {totalProducts} results</h3>
        </div>
        {products.map((product, i) => {
          return <Product user={user} key={i} product={product} />;
        })}
        <div className="pageNumberShow">Page: {pageNumber}</div>
        <div className="paginateButtons">
          <button
          className = {pageNumber===1? 'disabledButton': null}
            onClick={() =>
              setPageNumber((pageNumber) =>
                pageNumber === 1 ? 1 : pageNumber - 1
              )
            }
          >
            Prev
          </button>
          <button className = {pageNumber===Math.ceil(totalProducts/5)? 'disabledButton': null} onClick={() => setPageNumber((pageNumber) => pageNumber ===Math.ceil(totalProducts/5)? Math.ceil(totalProducts/5): pageNumber + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
