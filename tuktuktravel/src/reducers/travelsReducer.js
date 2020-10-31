import {
  FETCH_TRAVELS,
  FETCH_TRAVELS_SUCCESS,
  FETCH_TRAVELS_FAILURE,
} from "../actions/travelCardsActions"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TRAVELS:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_TRAVELS_SUCCESS:
      return {
        ...state,
        travels: action.payload.travels,
        status: STATUS_SUCCESS,
      };
    case FETCH_TRAVELS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      }; 
    default:
      return state;
  }
}