import { SET_USER } from "../types/user.types";

export const setUser = (user) => {
 return {
  type: SET_USER,
  payload: user,
 }
}
