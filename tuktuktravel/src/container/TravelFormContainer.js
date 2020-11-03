import { connect } from "react-redux";
import TravelForm from "../components/TravelForm";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    cityPic: state.cityPicState.cityPic
  }),
)(TravelForm);
