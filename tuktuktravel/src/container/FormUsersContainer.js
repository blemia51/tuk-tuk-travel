import { connect } from "react-redux";

import { postUserProfile } from "../actions/userActions";
import FormUsers from "../components/FormUsers";

export default connect(
  null,
  (dispatch) => ({
    postUserProfile: (userProfile) => dispatch(postUserProfile(userProfile)),
  })
)(FormUsers);
