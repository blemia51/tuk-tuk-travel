export const FETCH_TRAVELS = 'FETCH_TAVELS';
export const FETCH_TRAVELS_SUCCESS = 'FETCH_TRAVELS_SUCCESS';
export const FETCH_TRAVELS_FAILURE = 'FETCH_TRAVELS_FAILURE';

export const fetchTravels = (success) => ({
  type: FETCH_TRAVELS,
  payload: {
    success,
  },
});

export const fetchTravelsSuccess = (travels) => ({
  type: FETCH_TRAVELS_SUCCESS,
  payload: {
    travels: travels,
  },
});

export const fetchTravelsFailure = (error) => ({
  type: FETCH_TRAVELS_FAILURE,
  payload: {
    error,
  },
});




