import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import axios from "axios";

import NavFooter from "./NavFooter";
import UploadAvatar from "./UploadAvatar";
import TextInputMaterial from "./input/TextInputMaterial"
import logoOk from "../img/logoOk.png";
import "../App.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
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
        this.props.fetchUserProfileSuccess(data)
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

  render() {
    //console.log(this.props.userProfile);
    const { profile: stateProfile, user } = this.state;
    const inputs = Object.keys(stateProfile).reduce((acc, input) => {
      acc.push(input);
      return acc;
    }, []);
    console.log(inputs)
    console.log(user)
    return (
      <div>
        <div className="title-user-profile">PROFIL</div>
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
        {
            this.state.user.map((res) => (
              
                <div className="profile-picture-container">
                  <img
                    src={res.avatar}
                    alt="profil"
                    className="profile-picture"
                  ></img>
                </div>))}
        {inputs.map((input) => {
          return (
          <TextInputMaterial
          type={input}
          label={input}
          placeholder={input}
          className='select--material'
          name={input}
          //onChange={(value) => this.handleChange(value, input)}
          // hasError={input === 'email' && error !== ''}
          // errorMessage={error}
        />
        )})}

        <button className="send-form-users" onClick={this.submit}>
          Envoyer
        </button>

        <UploadAvatar />
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

function mapStateToProps(state) {
  return {
    userID: state.auth.userID,
    avatar: state.avatar.avatar,
  };
}

export default connect(mapStateToProps)(UserProfile);
