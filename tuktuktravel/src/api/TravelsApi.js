import axios from 'axios';

export default function TravelsApi() {
  
  return ({
    fetchTravels,
    fetchMyTravels
  });

  function fetchTravels() {
    return axios.get('/api/travels')
    .then((response) => response.data)
    .catch((error) => console.log(error))
  }

  function fetchMyTravels(userID) {
    return axios.get(`api/${userID}/travel_user`)
    .then((response) => response.data)
    .catch((error) => console.log(error))
  }
}
