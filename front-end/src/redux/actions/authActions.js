// /src/redux/actions/authActions.js
import axios from "axios";
import config from "../../config";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const login = (formData) => async (dispatch) => {
  try {
    const { email, password } = formData;
    const response = await axios.post(`${config.BASE_URL}/users/login`, {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    let errorMessage = "Login failed";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
