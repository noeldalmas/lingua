// /src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
