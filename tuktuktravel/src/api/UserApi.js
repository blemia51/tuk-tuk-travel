import axios from 'axios';

export default function UserApi() {
  return ({
    fetchUserProfile,
    postUserProfile,
    updateUserProfile,
  });

  function fetchUserProfile(userID, options) {
    return axios.get(`/api/users/${userID}`, options)
    .then((response) => response.data)
    .catch(event => console.error(event))
  }

  function postUserProfile(userProfile) {
    return axios.post(`/api/users`, userProfile)
    .then((response) => response.data)
    .catch(event => console.error(event))
  }

  function updateUserProfile(value) {
    return axios.put(`/api/user`, value)
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

