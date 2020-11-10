import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./fragments/Button"
import back from "../assets/img/arrowb.png";
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
    fetch(`/api/users/${IDuser_creator}`, {
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

    fetch(`/api/travels/${travelID}/users`, {
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
      .delete(`/api/travel_user/${id}`)
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
      state: { travelID},
    } = location;
    const travelDetail = this.props.travels.find(
      (travelDetail) => travelDetail.travelID === travelID
    );
    const { userCreator, users } = this.state;
    return (
      <div className="travel-details">
        <div className="img-travel-details">
          <figure className="container-city-picture">
            <img
              className="city-picture" 
              src={
                travelDetail.cityPic.split('/').length > 1 
                ? `https://i.ibb.co/${travelDetail.cityPic}` 
                : travelDetail.cityPic 
              }
              alt={travelDetail.cityPic}
            />
          </figure>
          <p className="travel-cards-link travel-cards-title">{travelDetail.destination} </p>
        </div>
        <div className="travel-creator">
          <img
            src={
              !userCreator.avatar
                ? "placeholder-profil.png"
                : userCreator.avatar
            }
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
                <Moment format="DD/MM/YYYY">{travelDetail.start_date}</Moment>{" "}
              </p>
              <span className="traveldetails-date"> - </span>
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{travelDetail.end_date}</Moment>{" "}
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
            <p className="descr-traveldetails">{travelDetail.description} </p>
          </div>
          <div className='reserve-button'>
          <Button
            onClick={() => this.cancelTravelReservation(travelDetail.travelUserId)}
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
