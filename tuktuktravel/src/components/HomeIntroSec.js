import React, { Component } from "react"
import { Link } from 'react-router-dom';
import imgSecPage from '../img/imgSecPage.png'
import '../App.css'

class HomeIntroSec extends Component {

  render() {
    return (
      <div className='home-intro'>
        <figure className='figure-img-sec-page'>
          <img className='img-sec-page' src={imgSecPage} alt='second page'/>
        </figure>
        <div className='title-intro'> 
          TROUVE TON  VOYAGE IDEAL
        </div>
        <div className='text-intro'> 
          Dis nous où tu veux aller, comment et les activités réalisées sur place
        </div>
        <div className='intro-link'>
          <Link to="/home">Suivant</Link>
        </div>
      </div>
    )
  }
}

export default HomeIntroSec;