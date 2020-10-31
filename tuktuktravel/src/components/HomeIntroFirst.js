import React, { Component } from "react";
import { Link } from 'react-router-dom';
import imgFirstPage from '../img/imgFirstPage.png';


class HomeIntroFirst extends Component {

  render() {
    return (
      <div className='home-intro'>
        <figure className='figure-img-first-page'>
          <img className='img-first-page' src={imgFirstPage} alt='first page'/>
        </figure>
        <div className='title-intro'> 
          EXPLORE LE MONDE
        </div>
        <div className='text-intro'> 
          Le monde est plus ouvert que jamais, autant en profiter
        </div>
        <div className='intro-link'>
          <Link  to="/introsecond">Suivant</Link>
        </div>
      </div>
    )
  }
}

export default HomeIntroFirst;
