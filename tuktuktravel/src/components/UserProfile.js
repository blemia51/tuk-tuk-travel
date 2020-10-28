import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";
import Button from './fragments/Button'
import NavFooter from "./NavFooter";
import UploadAvatarContainer from "../container/UploadAvatarContainer";
import TextInput from "./input/TextInput";
import logoOk from "../img/logoOk.png";
import "../App.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: {
        lastname: "",
        firstname: "",
        sex: "",
        password: "",
        birthday: "",
        country: "",
        city: "",
        email: "",
        phone_number: "",
        description: "",
      },
      user: [],
      isAdded: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { lastname, firstname, city, email, phone_number } = props.userProfile;
    const { 
      lastname: stateNom, 
      firstname: statePrenom, 
      city: stateCity, 
      email: stateEmail, 
      phone_number: statePhone
    } = state.profil;
    const stateNotHydrated = statePrenom === '' && 
        stateNom === '' && 
        stateCity === '' && 
        stateEmail === '' && 
        statePhone === '';
    if (stateNotHydrated) {
      return {
        profil: {
          lastname,
          firstname, 
          city, 
          email, 
          phone_number,
        }
      };
    }
    return state;
  }

  // GET ONE USER
  componentDidMount() {
    fetch(
      `http://localhost:8000/api/users/${this.props.userID}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          this.props.history.push("/userconnexion");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data)
        this.setState({
          user: data,
        });
      })
      .catch();
  }

  // UPDATE AVATAR
  submit = (e) => {
    e.preventDefault();
    const update = {
      userID: this.props.userID,
      avatar: this.props.avatar,
    };
    axios
      .put(`http://localhost:8000/api/users`, update)
      .then((res) => {
        this.setState({
          isAdded: true,
        });
      })
      .catch((event) => {
        console.error(event);
      });
  };

  handleChange = (value, type) => {
    const { profil } = this.state
    this.setState({
      profil: {
        ...profil,
        [type]: value,
      },
    })
  }

  render() {
    const { userProfile } = this.props
    const { profil: stateProfil, user } = this.state;
    const inputs = Object.keys(stateProfil).reduce((acc, input) => {
      if (input !== 'password') {
        acc.push(input);
      }
      return acc;
    }, []);
    console.log(userProfile)
    return (
      <div>
        <div className="title-user-profile">PROFIL</div>
        <span className='form-separator mb-2 mt-2' />
        {/* {React.Children.toArray(
          this.state.user &&
            this.state.user.map((res) => (
              <div className="user-profile">
                <div className="profile-picture-container">
                  <img
                    src={res.avatar}
                    alt="profil"
                    className="profile-picture"
                  ></img>
                </div>
                <div>Nom : {res.lastname}</div>
                <div>Prénom : {res.firstname}</div>
                <div>
                  Date de naissance :{" "}
                  <Moment format="DD/MM/YYYY">{res.birthday}</Moment>
                </div>
                <div>Ville : {res.city}</div>
                <div>{res.contry}</div>
                <div>E-mail : {res.email}</div>
                <div>Téléphone : {res.phone_number}</div>
                <div>{res.description}</div>
              </div>
            ))
        )} */}
        {React.Children.toArray(user.map((res) => (
          <div className="profile-picture-container">
            {/* <img
              src={res.avatar}
              alt="profil"
              className="profile-picture"
            ></img> */}
            <UploadAvatarContainer userProfileAvatar={userProfile.avatar}/>
          </div>
        )))}
        <div className="profil--general-container">
          <div className="profil--container">
            {React.Children.toArray(inputs.map((input) => {
              return (
                <TextInput
                  type={input}
                  label={input}
                  placeholder={input}
                  className='select--material'
                  name={input}
                  isLight
                  defaultValue={stateProfil[input] || ''}
                  onChange={(value) => this.handleChange(value, input)}
                  // hasError={input === 'email' && error !== ''}
                  // errorMessage={error}
                />
              )
            }))}
          </div>
        </div>
        <Button
          className="send-form-users"
          onClick={this.submit}
          label='Enregistrer les modifications'
        />
        {this.state.isAdded && (
          <div className="okUser">
            <img src={logoOk} alt="logoOk" className="logoOk" />
            <p className="user-added">Avatar changé</p>
          </div>
        )}
        <NavFooter />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userID: state.auth.userID,
//     avatar: state.avatar.avatar,
//   };
// }

// export default connect(mapStateToProps)(UserProfile);

export default UserProfile;

