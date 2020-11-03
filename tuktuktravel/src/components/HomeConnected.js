import React, { PureComponent } from 'react';
import Moment from "react-moment";
import SearchInput from "components/input/SearchInput";
import NavFooter from "./NavFooter";
import { Link } from "react-router-dom";
import back from "../img/arrowb.png";


class HomeConnected extends PureComponent {

  // static defaultProps = {
  //   userProfile: {}
  // }

  state = {
    travelsTemp: [],
    travelsStore: [],
    input: '',
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/travels", {
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
        this.props.fetchTravelsSuccess(data);
        this.setState({
          travelsTemp: data,
          travelsStore: data,
        });
      })
      .catch();

    fetch(`http://localhost:8000/api/users/${this.props.userID}`, {
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
        this.props.fetchUserProfileSuccess(...data);
        this.setState({
          user: data,
        });
      })
      .catch();

      fetch(`http://localhost:8000/api/travel_user/${this.props.userID}`, {
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
        this.props.fetchMyTravelsSuccess(data);
        this.setState({
          travel_user: data,
        });
      })
      .catch();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      this.searchCity()
    }
    if (prevProps.userProfile !== this.props.userProfile ) {
      this.setState({userProfileToto: this.props.userProfile})
    }
  }

  searchField = (e) => {
    // this.setState((state) => {
    // // Important : lisez `state` au lieu de `this.state` lors de la mise à jour.
    // return {count: state.count + 1}
    this.setState({ input: e.target.value });
  };

  searchCity = (e) => {
    const { travelsStore, input } = this.state;
    if (input.length > 2) {
      const result = travelsStore.filter((travel) =>
        travel.destination.toLowerCase().includes(input.toLowerCase())
      );
      this.setState({ travelsTemp: result });
    } else {
      this.setState({ travelsTemp: travelsStore });
    }
  };

  renderMyNextTravel = () => {
    if (!this.props.myTravels) {
      return null;
    }
    return (
      <div className="travel--container">
          {React.Children.toArray(
            this.props.myTravels.map((res) => {
              return (
                <div className="liste-travel my-next-travel">
                  <div className="row-70" style={{width: '70%'}}>
                  <div
                    className="fig-img-travel-cards"
                    style={{ backgroundImage: `url(${res.cityPic})` }}>
                  </div>
                  <Link
                    className="travel-cards-link"
                    to={{
                      pathname: "/mytraveldetails",
                      state: {
                        cityPic: res.cityPic,
                        travelID: res.travelID,
                        destination: res.destination,
                        IDuser_creator: res.IDuser_creator,
                        start_date: res.start_date,
                        end_date: res.end_date,
                        description: res.description,
                        travelUserId: res.travel_user_id,
                      },
                    }}
                  >
                    {/* <h1 className="travel-cards-title">{res.destination}</h1> */}
                  </Link>
                  </div>
                  <div className="row-30" style={{width: '30%'}}>
                    <h3>{res.destination}</h3>
                    <Moment format="DD/MM/YYYY">{res.start_date}</Moment>
                  </div>
                  {/* <div className="liste-description-travel-cards">
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Moment format="DD/MM/YYYY">{res.start_date}</Moment>
                      <span className="travel-date"> - </span>
                      <Moment format="DD/MM/YYYY">{res.end_date}</Moment>
                    </div>
                    <p>Places: {res.number_of_travelers_max}</p>
                  </div> */}
                </div>
              );
            })
          )}
        </div>
    )
  }

  renderNewTravels = () => {
    return (
      <div className="travel--container">
        {React.Children.toArray(
          this.state.travelsTemp.slice(0, 2).map((travel) => {
            return (
              
              <div className="liste-travel">
                <div className="fig-img-travel-cards" style={{ backgroundImage: `url(${travel.cityPic})` }}>
                  {/* <img
                    className="img-travel-cards"
                    alt={travel.cityPic}
                    src={travel.cityPic}
                  ></img> */}
                </div>
                <Link
                  className="travel-cards-link"
                  to={{
                    pathname: "/traveldetails",
                    state: {
                      travelID: travel.travelID,
                      IDuser_creator: travel.IDuser_creator,
                    },
                  }}
                >
                  <div>
                    <h1 className="travel-cards-title">{travel.destination}</h1>
                  </div>
                </Link>
                <div className="liste-description-travel-cards">
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Moment format="DD/MM/YYYY">{travel.start_date}</Moment>
                    <span className="travel-date"> - </span>
                    <Moment format="DD/MM/YYYY">{travel.end_date}</Moment>
                  </div>
                  <p>Places: {travel.number_of_travelers_max}</p>
                </div>
              </div>
              
            );
          })
        )}
        </div>
    )
  }

  render() {
    if (!this.props.userProfile) {
      return null 
    }

   // console.log(this.props)
     
    return (
      <div className="travel-cards">
        <div className="title-and-home">
          <div className="title-travel-cards">Tuk-tuk Travel</div>
          <div>
            <Link className="link-back-arrow" to="/logout">
              <figure className="fig-back-arrow-travelcards">
                <img className="back-arrow" src={back} alt="Arrow to back" />
              </figure>
            </Link>
          </div>
        </div>
        <SearchInput
          className='search'
          placeholder={`On part ou ${this.props.userProfile.firstname} ?`}
          onChange={this.searchField}
        />
        <div className='travel--container' >
        <div className="title-travel-cards">Prochain Tuk-tuk Prévu</div>
        <span className="form-separator mb-2 mt-2" />
        {this.renderMyNextTravel()}
        <div className="title-travel-cards">A découvrir !</div>
        <span className="form-separator mb-2 mt-2" />
        {this.renderNewTravels()}
        </div>
        <NavFooter />
      </div>
    )
  }
}

export default HomeConnected;
