import {combineReducers} from  'redux'
import  authReducer  from  './authReducer'
import avatarReducer from './avatarReducer'
import cityPicReducer from './cityPicReducer'


const  allReducers  =  combineReducers({
    auth:  authReducer,
    avatar: avatarReducer,
    cityPic: cityPicReducer
});
export  default  allReducers;