import { combineReducers } from "redux";
import authReducer from "./authReducer";
import avatarReducer from "./avatarReducer";
import cityPicReducer from "./cityPicReducer";
import userReducer from "./userReducer";
import travelsReducer from "./travelsReducer";
import favoritesReducer from "./favoritesReducer"
import myTravelsReducer from "./myTravelsReducer"

const allReducers = combineReducers({
  auth: authReducer,
  avatarState: avatarReducer,
	cityPicState: cityPicReducer,
  userState: userReducer,
  travelsState: travelsReducer,
  favoritesState: favoritesReducer,
  myTravelsState: myTravelsReducer,
});
export default allReducers;
