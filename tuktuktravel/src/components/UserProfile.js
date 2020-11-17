import PropTypes from "prop-types";
import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";
import Button from './fragments/Button'
import NavFooter from "./NavFooter";
import UploadAvatar from "../container/UploadAvatarContainer";
import TextInput from "./input/TextInput";
import logoOk from "../assets/img/logoOk.png";


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
    const { 
      lastname,
      firstname,
      city,
      email,
      phone_number,
      description 
    } = props.userProfile;
    const { 
      lastname: stateNom, 
      firstname: statePrenom, 
      city: stateCity, 
      email: stateEmail, 
      phone_number: statePhone,
      description: stateDescription,
    } = state.profil;
    const stateNotHydrated = statePrenom === '' && 
        stateNom === '' && 
        stateCity === '' && 
        stateEmail === '' && 
        statePhone === '' &&
        stateDescription === '';
    if (stateNotHydrated) {
      return {
        profil: {
          lastname,
          firstname, 
          city, 
          email, 
          phone_number,
          description,
        }
      };
    }
    return state;
  }

  // GET ONE USER
  componentDidMount() {
    fetch(
      `/api/users/${this.props.userID}`,
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
        this.setState({
          user: data,
        });
      })
      .catch();
  }

  // UPDATE PROFIL
  handleSubmit = (e) => {
    const { profil } = this.state;
    e.preventDefault();
    const update = {
      ...profil,
      userID: this.props.userID,
      avatar: this.props.avatar,
    };
    console.log(update)
    //this.props.updateProfile(update)

    // fetch(
    //   `/api/user`,
    //   { 
    //     method: "PUT",
    //     body: JSON.stringify({...profil}),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   },
    // )
    // .then((res) => {
    //   this.setState({
    //     isAdded: true,
    //   });
    // })
    // .catch((event) => {
    //   console.error(event);
    // });

    axios
      .put(`/api/users`, update)
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
    const { profil } = this.state;
    this.setState({
      profil: {
        ...profil,
        [type]: value,
      },
    })
  }

  render() {
    const { userProfile } = this.props;
    const { profil: stateProfil } = this.state;
    const inputs = Object.keys(stateProfil).reduce((acc, input) => {
      if (input !== 'password') {
        acc.push(input);
      }
      return acc;
    }, []);
  
    return (
      <div>
        <div className="title-user-profile">PROFIL</div>
        <span className='form-separator mb-2 mt-2' />
        <div className="profile-picture-container">
          <UploadAvatar userProfileAvatar={userProfile.avatar} />
        </div>
        <div className="profil--general-container">
          <div className="profil--container">
            {React.Children.toArray(inputs.map((input) => {
              return (
                <TextInput
                  //noEdit
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
          onClick={this.handleSubmit}
          label='Enregistrer les modifications'
        />
        {this.state.isAdded && (
          <div className="okUser">
            <img src={logoOk} alt="logoOk" className="logoOk" />
            <p className="user-added">Modifications enregistrées</p>
          </div>
        )}
        <NavFooter />
      </div>
    );
  }
}

UserProfile.propTypes = {
  avatar: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  token: PropTypes.string,
  userID: PropTypes.number,
  userProfile: PropTypes.object,
  updateUserProfile: PropTypes.func,
}

export default UserProfile;
