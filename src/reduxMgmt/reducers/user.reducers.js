import { SET_USER } from "../types/user.types";

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
