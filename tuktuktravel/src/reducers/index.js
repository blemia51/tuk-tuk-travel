import { combineReducers } from "redux";
import authReducer from "./authReducer";
import avatarReducer from "./avatarReducer";
import cityPicReducer from "./cityPicReducer";
import userReducer from "./userReducer"

const allReducers = combineReducers({
  auth: authReducer,
  avatar: avatarReducer,
	cityPic: cityPicReducer,
	userState: userReducer,
});
export default allReducers;
