import { combineReducers } from "redux";
import authReducer from "./authReducer";
import avatarReducer from "./avatarReducer";
import cityPicReducer from "./cityPicReducer";
import userReducer from "./userReducer";
import travelsReducer from "./travelsReducer"

const allReducers = combineReducers({
  auth: authReducer,
  avatarState: avatarReducer,
	cityPic: cityPicReducer,
  userState: userReducer,
  travelState: travelsReducer,
});
export default allReducers;
