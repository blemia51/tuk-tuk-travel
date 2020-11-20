import axios from 'axios';

export default function UserApi() {
  return ({
    fetchUserProfile,
    postUserProfile,
    updateUserProfile,
  });

  function fetchUserProfile(userID, token) {
    return axios.get(`/api/users/${userID}`, {
      headers: {
        Authorization: "Bearer " + token,
       "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch(event => console.error(event))
  }

  function postUserProfile(userProfile) {
    return axios.post(`/api/users`, userProfile)
    .then((response) => response.data)
    .catch(event => console.error(event))
  }

  function updateUserProfile(userProfile) {
    return axios.put(`/api/users`, userProfile)
    .then((response) => response.data)
    .catch(event => console.error(event))
  }

}
        
      
      
    
    // function fetchUserProfile(id) {
    //   let endpoint = `/api/users/${id}`;

    //   return executor
    //     .get(endpoint, {
    //      // headers: {
        //   Authorization: "Bearer " + this.props.token,
        //   "Content-Type": "application/json",
        // },
    //     })
    //     .then(response => {
    //       return response;
    //     });
    // }
    
 // }
//}

