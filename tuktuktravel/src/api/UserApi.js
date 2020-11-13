function UserApi(executor) {
  return {
    fetchUserProfile,
    //changeUserProfile,
  };

  function fetchUserProfile(id) {
    console.log('idididididididididi')
    return (
      
      fetch(`http://localhost:8000/api/users/${id}`, {
        method: "GET",
        // headers: {
        //   Authorization: "Bearer " + this.props.token,
        //   "Content-Type": "application/json",
        // },
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
    
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
}

export default UserApi;
