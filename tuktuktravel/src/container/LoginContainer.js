import { connect } from "react-redux";

import { saveToken } from "../actions/authActions";
import Login from "../components/Login";

export default connect(
    (state) => ({
      token: state.auth.token,
    }),
    (dispatch) => ({
      saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(Login);
