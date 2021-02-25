import { SET_USER,SET_PRODUCTS, SET_CART } from "../types/types";

export const setUser = (user) => {
 return {
  type: SET_USER,
  payload: user,
 }
}

export const setProducts = products =>{
    return {
        type:SET_PRODUCTS,
        payload: products
    }
}

export const setCart = products =>{
    return {
        type: SET_CART,
        payload:products
    }
}