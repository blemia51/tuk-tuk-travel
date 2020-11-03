import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./fragments/Button"
import back from "../img/arrowb.png";
import Moment from "react-moment";
import NavFooter from "./NavFooter";

class TravelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCreator: [],
      users: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const {
      state: { IDuser_creator, travelID },
    } = location;
    fetch(`http://localhost:8000/api/users/${IDuser_creator}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          this.props.history.push("/userconnexion");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          userCreator: data[0],
        });
      })
      .catch();

    fetch(`http://localhost:8000/api/travels/${travelID}/users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          this.props.history.push("/userconnexion");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          users: data,
        });
      })
      .catch();
  }

  cancelTravelReservation = (id) => {
    const { confirm } = window;
    confirm('Êtes vous sûr(e) de vouloir supprimer vôtre réservation ?') &&
    axios
      .delete(`http://localhost:8000/api/travel_user/${id}`)
      .then((res) => {
        this.props.history.push("/mytravels");
      })
      .catch((event) => {
        console.error(event);
        alert("tuk-tuk non supprimé");
      });
  }

  render() {
    if (this.state.userCreator === []) {
      return null
    }
    const { location } = this.props;
    const {
      state: { cityPic, destination, start_date, end_date, description, travelUserId },
    } = location;
    const { userCreator, users } = this.state;
    return (
      <div className="travel-details">
        <div className="img-travel-details">
          <figure className="container-city-picture">
            <img className="city-picture" src={cityPic} alt={cityPic} />
          </figure>
          <p className="travel-cards-link travel-cards-title">{destination} </p>
        </div>
        <div className="travel-creator">
          <img
            src={userCreator.avatar}
            alt="Avatar"
            className="user-creator-avatar"
          ></img>
          <div className="travel-detail-container">
            <div className="link-back-arrow-details">
              <Link to="/mytravels">
                <img className="back-arrow" src={back} alt="Arrow to back" />
              </Link>
            </div>
            <p className="firstname-traveldetails">{userCreator.firstname}</p>
            <p>Contact: {userCreator.email}</p>
            <div className="dates">
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{start_date}</Moment>{" "}
              </p>
              <span className="traveldetails-date"> - </span>
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{end_date}</Moment>{" "}
              </p>
            </div>
            <div className="travel-user-avatar-container">
              {users.map((user) => (
                <div className="travel-user-description">
                  <div className="travel-user-avatar-box">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="travel-user-avatar"
                    />
                  </div>
                  <p className="travel-user-avatar-firstname">
                    {user.firstname}
                  </p>
                </div>
              ))}
            </div>
            <p className="descr-traveldetails">{description} </p>
          </div>
          <div className='reserve-button'>
          <Button
            onClick={() => this.cancelTravelReservation(travelUserId)}
            label='Annuler ma réservation'
            //isDisabled={!isUserBooked}
          />
          </div>
        </div>
        <NavFooter />
      </div>
    );
  }
}

TravelDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  location: PropTypes.string,
  token: PropTypes.number,
}

export default TravelDetails;
