import { SET_PRODUCTS, SET_USER } from "../types/types";

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
}
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

