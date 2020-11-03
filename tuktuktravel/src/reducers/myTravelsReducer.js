import {
  FETCH_MY_TRAVELS,
  FETCH_MY_TRAVELS_SUCCESS,
  FETCH_MY_TRAVELS_FAILURE,
} from "actions/myTravelsAction"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MY_TRAVELS:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_MY_TRAVELS_SUCCESS:
      return {
        ...state,
        myTravels: action.payload.myTravels,
        status: STATUS_SUCCESS,
      };
    case FETCH_MY_TRAVELS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      }; 
    default:
      return state;
  }
}