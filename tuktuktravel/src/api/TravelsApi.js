import axios from 'axios';

// function TravelsApi(executor) {
//   return {
//     fetchTravels,
//     //changeUserProfile,
//   };

  const fetchTravels = () => {
    console.log('idididididididididi')
    return (

      axios.get('/api/travels')
      .then(function (response) {
      // handle success
        console.log(response);
      })
      .catch(function (error) {
      // handle error
        console.log(error);
      })
      .then(function () {
    // always executed
      })
      
      // fetch(`/api/travels`, {
      //   method: "GET",
      //   // headers: {
      //   //   Authorization: "Bearer " + this.props.token,
      //   //   "Content-Type": "application/json",
      //   // },
      // })
      // .then((response) => {
      //   return response.json();
      // })
      // .then((data) => {
      //   return data;
      // })
    
    // function fetchUserProfile(id) {
    //   let endpoint = `/api/users/${id}`;

    //   return executor
    //     .get(endpoint, {
    //       timeout: 600000,
    //       // headers: {
    //       //   Authorization: `Basic ${FORM_CONTACT_TOKEN}`
    //       // }
    //     })
    //     .then(response => {
    //       return response;
    //     });
    // }
    )
  
}
// }


export default fetchTravels;
