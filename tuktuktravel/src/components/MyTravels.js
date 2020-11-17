import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NavFooter from "./NavFooter";
//import del from "../assets/img/delete.png";
import axios from "axios";

class MyTravels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travel_user: [],
    };
  }

  componentDidMount() {
    const { fetchMyTravels, userID, myTravels } = this.props
    fetchMyTravels(userID);
    if (myTravels) {
      this.setState({ travel_user: myTravels });
    }
  }

   componentDidUpdate(prevProps) {
     if (prevProps.myTravels !== this.props.myTravels) {
       this.setState({ travel_user: this.props.myTravels });
     }
   }

  cancelTravelReservation = (id) => {
    axios
      .delete(`/api/travel_user/${id}`)
      .then((res) => {
        const myTravels = this.state.travel_user.filter(
          (travel) => travel.travel_user_id !== id
        );
        this.setState({ travel_user: myTravels });
        //alert(`tuk-tuk supprimé`)
      })
      .catch((event) => {
        console.error(event);
        alert("tuk-tuk non supprimé");
      });
  };

  renderFavorites = () => {
    const { favorites, travels } = this.props;
    const favoris = favorites.map((favorite) =>
      travels.find((travel) => travel.travelID === favorite)
    );

    return (
      <div>
        <div className="title-travel-cards">Mes Annonces sauvegardées</div>
        <div className="tuktuk--favorites">
          {favoris.length > 0 ? (
            favoris.map((favori) => {
              return (
                <div className="favorites--container" key={`id_${favori.travelID}`}>
                  <Link
                    to={{
                      pathname: "/traveldetails",
                      state: {
                        travelID: favori.travelID,
                        IDuser_creator: favori.IDuser_creator,
                      },
                    }}
                  >
                    <img
                      src={
                        favori && favori.cityPic.split("/").length > 1
                          ? `https://i.ibb.co/${favori.cityPic}`
                          : favori.cityPic
                      }
                      className="tuktuk--favorites-image"
                    />
                  </Link>
                  <p>{favori.destination}</p>
                </div>
              );
            })
          ) : (
            <div className="favorites-placeholder mt-2">
              <div>
                <i className="fas fa-heart favorites" />
              </div>
              <div className="favorites-placeholder-text">
                <p>Vous n'avez pas sauvegardé d'annonces...</p>
                <p>Cliquez sur l'icone quand un voyage vous fait envie !</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  renderMyTravels = () => {
    const { travels, userID } = this.props;
    const myTravels = travels.filter(
      (travel) => travel.IDuser_creator === userID
    );
    return (
      <div>
        {myTravels.length > 0 &&
          React.Children.toArray(
            myTravels.map((myTravel) => {
              return (
                <div className="liste-travel">
                  <div
                    className="fig-img-travel-cards"
                    style={{
                      backgroundImage:
                        myTravel.cityPic.split("/").length > 1
                          ? `url(https://i.ibb.co/${myTravel.cityPic})`
                          : `url(${myTravel.cityPic})`,
                    }}
                  />
                </div>
              );
            })
          )}
      </div>
    );
  };

  render() {
    return (
      <div className="travel-cards">
        <div className="title-travel-cards">Mes Tuk-tuk</div>
        <span className="form-separator mb-2 mt-2" />
        <div className="title-travel-cards">Prochains Tuk-tuk Prévus</div>
        <div className="travel--container">
          
          {React.Children.toArray(
            this.state.travel_user.map((res) => {
              return (
                <div className="liste-travel" key={res.id} >
                  {/* <figure
                    style={{
                      position: "relative",
                      top: "70px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      style={{ width: "30px", cursor: "pointer" }}
                      onClick={() => this.cancelTravelReservation(res.travel_user_id)}
                      src={del}
                      alt="del"
                    ></img>
                  </figure> */}
                  <div
                    className="fig-img-travel-cards"
                    style={{
                      backgroundImage:
                        res.cityPic.split("/").length > 1
                          ? `url(https://i.ibb.co/${res.cityPic})`
                          : `url(${res.cityPic})`,
                    }}
                  >
                  </div>
                  <Link
                    className="travel-cards-link"
                    to={{
                      pathname: "/mytraveldetails",
                      state: {
                        travelID: res.travelID,
                        IDuser_creator: res.IDuser_creator,
                        travelUserId: res.travel_user_id,
                      },
                    }}
                  >
                    <h1 className="travel-cards-title">{res.destination}</h1>
                  </Link>
                  <div className="liste-description-travel-cards">
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Moment format="DD/MM/YYYY">{res.start_date}</Moment>
                      <span className="travel-date"> - </span>
                      <Moment format="DD/MM/YYYY">{res.end_date}</Moment>
                    </div>
                    <p>Places: {res.number_of_travelers_max}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="title-travel-cards">Mes Annonces</div>
        {this.renderMyTravels()}
        {this.renderFavorites()}
        <NavFooter />
      </div>
    );
  }
}

MyTravels.propTypes = {
  favorites: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  token: PropTypes.string,
  travels: PropTypes.array,
  userID: PropTypes.number,
  myTravels: PropTypes.array,
  fetchMyTravels: PropTypes.func,
};

export default MyTravels;
