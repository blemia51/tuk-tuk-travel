import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "components/input/TextInput";
import { validateEmail } from "utils/validatorUtils";
import back from "../img/arrowb.png";
import logoFaux from "../img/logoFaux.png";
import "../App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        password: "",
      },
      flash: "",
      isNotAdded: false,
      error: "",
    };
  }

  handleChange = (value, type) => {
    const { login } = this.state;
    console.log(login)
    if (type === 'email' && !validateEmail(value) && value !== '') {
      this.setState({
        error: 'Veuillez insérer un email valide'
      });
     // return;
    }
    if (type === 'email' && (validateEmail(value) || value === '')) {
      this.setState({
        error: ''
      });
      //return;
    }
    this.setState({
      login: {
        ...login,
        [type]: value,
      },
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state.login),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          this.props.history.push("/userconnexion");
          this.setState({
            isNotAdded: true,
          });
        }
      })
      .then((res) => {
        console.log(res)
        this.props.saveToken(res.token, res.user.userID)
        this.props.history.push("/travelcards");
        this.setState({ flash: res.flash });
      })
      .catch((err) => this.setState({ flash: err.flash }));
  }

  render() {
    const { error } = this.state;
    const { login: stateLogin } = this.state;
    const inputs = Object.keys(stateLogin).reduce((acc, input) => {
      acc.push(input);
      return acc;
    }, []);
    return (
      <div>
        <div className="title-user-connexion">Connecte - toi ! </div>
        <Link className="link-cgu-to-formuser" to="/Home">
          <figure className="fig-back-arrow">
            <img className="back-arrow" src={back} alt="Arrow to back" />
          </figure>
        </Link>
        
        <form className="user_connexion" onSubmit={this.submitForm}>
          <div>
            <div className='profil--general-container'>
              <div className="profil--container">
              {inputs.map((input) => {
                return (
                  <TextInput
                    key={`input_${input}`}
                    type={input}
                    label={input}
                    placeholder={input}
                    className='select--material'
                    name={input}
                    onChange={(value) => this.handleChange(value, input)}
                    hasError={input === 'email' && error !== ''}
                    errorMessage={error}
                  />
                )
              })}
            </div>
            </div>
          </div>
          <div className="submit-button">
            <input type="submit" value="Connexion" />
          </div>
        </form>
        
        {this.state.isNotAdded ? (
          <div className="noConnexion">
            <img src={logoFaux} alt="logo Faux" className="error" />
            <p className="erreurConnexion">Erreur de connexion</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Login;
