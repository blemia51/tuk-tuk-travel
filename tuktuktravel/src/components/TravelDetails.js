import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "../assets/img/arrowb.png";
import Moment from "react-moment";
import Reservation from "./Reservation";
import FavoritesContainer from "../container/FavoritesContainer";
import NavFooter from "./NavFooter";

class TravelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCreator: [],
      users: [],
      hasFavorites: false,
    };
  }
  componentDidMount() {
    const { hasFavorites } = this.state;
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

      if (this.props.favorites.indexOf(travelID) !== -1) {
        this.setState({ hasFavorites: !hasFavorites });
      } 
  }

  handleAddFavorites = () => {
    const { location } = this.props;
    const {
      state: {
        travelID,
      },
    } = location;
    const { hasFavorites } = this.state;
    const fav = this.props.favorites
    console.log('favorites', fav)
    console.log('travelID', travelID)

    if (fav.indexOf(travelID) === -1) {
      fav.push(travelID)
      console.log('favorites', fav)
      this.props.uploadFavorite(fav)
      this.setState({ hasFavorites: !hasFavorites });
    }
  }

  render() {
    if (this.state.userCreator === []) {
      return null
    }
    const { location } = this.props;
    const {
      state: {
        travelID,
      },
    } = location;

    const travelDetail = this.props.travels.find((travelDetail) => 
      travelDetail.travelID === travelID
    )
    console.log('travel', travelDetail)
    const { userCreator, users, hasFavorites } = this.state;
    return (
      <div className="travel-details">
        <div className="img-travel-details">
          <figure className="container-city-picture">
            <img className="city-picture" src={travelDetail.cityPic} alt={travelDetail.cityPic} />
          </figure>
          <p className="travel-cards-link travel-cards-title">{travelDetail.destination} </p>
        </div>

        <div className="travel-creator">
        <Link to="/chat">
          <img
            src={!userCreator.avatar ? 'placeholder-profil.png' : userCreator.avatar}
            alt="Avatar"
            className="user-creator-avatar"
          ></img>
          </Link>
          <div className="travel-detail-container">
            <div className="link-back-arrow-details">
              {/* <Link to="/travelcards"> */}
                <img className="back-arrow" src={back} alt="Arrow to back" onClick={()=>this.props.history.goBack()}/>
              {/* </Link> */}
            </div>

            <p className="firstname-traveldetails">{userCreator.firstname}</p>
            {/* <p>Contact: {userCreator.email}</p> */}

            <a href={`mailto:${userCreator.email}`}>
              <i className="far fa-envelope"></i>
              {' '}{userCreator.email}
            </a>
            <span className="form-separator w-70" />

            <div className="dates">
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{travelDetail.start_date}</Moment>{" "}
              </p>
              <span className="traveldetails-date"> - </span>
              <p className="date-traveldetails">
                <Moment format="DD/MM/YYYY">{travelDetail.end_date}</Moment>{" "}
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
              <p className="descr-traveldetails">{travelDetail.description} </p>
            </div>
          </div>
          
          <div className="btn--travel-detail">
            <FavoritesContainer
              travelID={travelID}
              className='fas fa-heart'
              onClick={this.handleAddFavorites}
              isDisabled={hasFavorites}
            />
            <Reservation
              users={users}
              userID={this.props.userID}
              travelID={travelID}
              IDuser_creator={travelDetail.IDuser_creator}
              numberOfTravelersMax={travelDetail.number_of_travelers_max}
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
