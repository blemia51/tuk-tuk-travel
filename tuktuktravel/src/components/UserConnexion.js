import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { connect } from  'react-redux';
import back from '../img/arrowb.png'
import logoFaux from '../img/logoFaux.png';
import '../App.css'


class UserConnexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      flash: '',
      isNotAdded: false
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault()
    fetch('http://localhost:8000/api/login',
      {
        method: 'POST',
        headers:  new  Headers({
        'Content-Type':  'application/json'
      }),
      body:  JSON.stringify(this.state),
      })
    
    .then(res  => {
      if (res.ok) {
        return res.json()
      }
      else {
        this.props.history.push('/userconnexion')
        this.setState ({
          isNotAdded : true
        })
      }
    })
    .then(res  =>  {
      this.props.dispatch(
        {
          type : "CREATE_SESSION",
          userID: res.user.userID,
          token : res.token,
          message : res.message
        }
      )
      
      this.props.history.push("/travelcards")
      this.setState({ "flash":  res.flash })
    })
    .catch(err  =>  this.setState({ "flash":  err.flash }))
  }

  render() {
    return (
      <div>
      <div className="title-user-connexion">Connecte - toi  ! </div>
        <Link className='link-cgu-to-formuser' to="/Home">
          <figure className='fig-back-arrow'>
            <img className='back-arrow' src={back} alt='Arrow to back'/>
          </figure>
        </Link>
          <form className="user_connexion" onSubmit={this.submitForm}>
            
  
                <label htmlFor="email">E-mail </label>
                <input className="input-user_connexion" type="email" id="email" name="email"
                  onChange={this.onChange} value={this.state.email}/>
             
                <label htmlFor="password">Mot de passe </label>
                <input className="input-user_connexion" type="password" id="password" name="password"
                  onChange={this.onChange} value={this.state.password} maxLength="13" size="13"/>
              
              <div className="submit-button">
                <input type="submit" value="Connexion" />
              </div>
          </form>
          {this.state.isNotAdded ?
              <div className='noConnexion'>
                
                  <img src={logoFaux} alt='logo Faux' className='error'/>
                
                <p className="erreurConnexion">Erreur de connexion</p>
              </div> : null}
      </div>
    )
  }
}

function  mapStateToProps(state) {
  return {
      token:  state.auth.token,
      userID: state.auth.userID
  }
};

export  default  connect(mapStateToProps)(UserConnexion)
