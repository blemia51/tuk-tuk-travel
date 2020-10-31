import { connect } from "react-redux";

import { fetchUserProfileSuccess } from "../actions/userActions";
import {fetchTravelsSuccess} from "../actions/travelCardsActions"
import TravelCards from "../components/TravelCards";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
  }),
  (dispatch) => ({
    fetchUserProfileSuccess: (data) => dispatch(fetchUserProfileSuccess(data)),
    fetchTravelsSuccess: (travels) => dispatch(fetchTravelsSuccess(travels)),
  })
)(TravelCards);
