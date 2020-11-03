import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from "../actions/userActions"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload.userProfile,
        status: STATUS_SUCCESS,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      }; 
    default:
      return state;
  }
}