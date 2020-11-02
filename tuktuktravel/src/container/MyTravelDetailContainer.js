import { connect } from "react-redux";
import MyTravelDetails from "../components/MyTravelDetails";

export default connect(
  (state) => ({
    userProfile: state.userState.userProfile,
    userID: state.auth.userID,
    token: state.auth.token,
    travels: state.travelsState.travels,
  }),
 
)(MyTravelDetails);