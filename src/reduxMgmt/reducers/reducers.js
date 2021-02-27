import { SET_CART, SET_PRODUCTS, SET_USER, SET_FILTER } from "../types/types";

const initialUserState = {
  user: {},
};
export const setUser = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialProductsState = {
  products: [],
};
export const setProducts = (state = initialProductsState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

const initialCartProducts = {
  products: [],
};
export const setCart = (state = initialCartProducts, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        products: [...action.payload],
      };
    default:
      return state;
  }
};

const initialFilterDetails = {
  type: [],
  variety: [],
  min: 0,
  max: 0,
  name: ""
};
export const setFilter = (state = initialFilterDetails, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
