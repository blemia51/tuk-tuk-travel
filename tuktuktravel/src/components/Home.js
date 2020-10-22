import React from 'react';
import myLogo from '../img/tuk-tuk logo.png';
import { Link } from 'react-router-dom';
import '../App.css'

const Home = () => {

  return (
    <div className='firstpage'>

      <figure className="tuktuk-logo">
        <img src={myLogo} alt='logo'/>
      </figure>

      <div className='home-link'>

        <Link to="/formusers" >S'inscrire</Link>

        <Link to="/userconnexion">Se connecter</Link>

      </div>

    </div>
  )
}

export default Home;