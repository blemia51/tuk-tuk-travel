import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "../img/arrowb.png";
import Moment from "react-moment";
import Reservation from "./Reservation";
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

  render() {
    const { location } = this.props;
    const {
      state: {
        cityPic,
        destination,
        start_date,
        end_date,
        description,
        travelID,
        IDuser_creator,
        numberOfTravelersMax
      },
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
              <Link to="/travelcards">
                <img className="back-arrow" src={back} alt="Arrow to back" />
              </Link>
            </div>

            <p className="firstname-traveldetails">{userCreator.firstname}</p>
            {/* <p>Contact: {userCreator.email}</p> */}

            <a href={`mailto:${userCreator.email}`}>
              <i class="far fa-envelope"></i>
            </a>
            <span className="form-separator w-70" />

            <div className="dates">
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{start_date}</Moment>{" "}
              </p>
              <span className="traveldetails-date"> - </span>
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{end_date}</Moment>{" "}
              </p>
            </div>
            <span className="form-separator w-70 mt-2" />
            <div className="travel-user-avatar-container">
              {React.Children.toArray(
                users.map((user) => (
                  <div className="travel-user-description">
                    <div className="travel-user-avatar-box">
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="travel-user-avatar"
                      ></img>
                    </div>
                    <p className="travel-user-avatar-firstname">
                      {user.firstname}
                    </p>
                    <span className="form-separator mt-2" />
                  </div>
                ))
              )}
            </div>
            <div className="traveldetail-description">
              <p className="descr-traveldetails">{description} </p>
            </div>
          </div>
          <div className="reserve">
            <Reservation
              users={users}
              userID={this.props.userID}
              travelID={travelID}
              IDuser_creator={IDuser_creator}
              numberOfTravelersMax={numberOfTravelersMax}
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
  token: PropTypes.string,
  userID: PropTypes.number,
}

export default TravelDetails;
