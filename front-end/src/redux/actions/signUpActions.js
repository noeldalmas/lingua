// /src/actions/signUpActions.js
import { setSignUpData } from "../reducers/signUpReducer";

export const updateSignUpData = (data) => (dispatch) => {
  dispatch(setSignUpData(data));
};
