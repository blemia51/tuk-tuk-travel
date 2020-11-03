export const FETCH_MY_TRAVELS = 'FETCH_MY_TAVELS';
export const FETCH_MY_TRAVELS_SUCCESS = 'FETCH_MY_TRAVELS_SUCCESS';
export const FETCH_MY_TRAVELS_FAILURE = 'FETCH_MY_TRAVELS_FAILURE';

export const fetchMyTravels = (success) => ({
  type: FETCH_MY_TRAVELS,
  payload: {
    success,
  },
});

export const fetchMyTravelsSuccess = (travels) => ({
  type: FETCH_MY_TRAVELS_SUCCESS,
  payload: {
    myTravels: travels,
  },
});

export const fetchMyTravelsFailure = (error) => ({
  type: FETCH_MY_TRAVELS_FAILURE,
  payload: {
    error,
  },
});




