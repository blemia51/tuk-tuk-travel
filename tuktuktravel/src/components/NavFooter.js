import React from "react";
import {Link} from 'react-router-dom';
import logoProposer from '../assets/img/logoProposer.png';
import compass from '../assets/img/compass.png';
import folder from '../assets/img/folder.png';
import profile from '../assets/img/profile.png';
import accueil from '../assets/img/accueil.png'



const NavFooter = () => {
  return (
    <div className='footer'>
      <div>
        <Link className='link-footer' to="/Accueil">
          <figure className='logos-footer'>
            <img className='img-footer' src={accueil} alt='logo accueil'/>
          </figure>
          <p className="title_footer">Accueil</p>
        </Link>
      </div>
      <div>
        <Link className='link-footer' to="/TravelCards">
          <figure className='logos-footer'>
            <img className='img-footer' src={compass} alt='logo explorer'/>
          </figure>
          <p className="title_footer">Explorer</p>
        </Link>
      </div>
      <div>
        <Link className='link-footer title-purpose' to="/TravelForm">
          <figure className='logos-purpose'>
            <img className='img-footer-purpose' src={logoProposer} alt='logo proposer'/>
          </figure>
          <p className="title_footer_purpose ">Proposer</p>
        </Link>
      </div>
      <Link className='lien' to="/MyTravels">
        <figure className='logos-footer'>
          <img className='img-footer' src={folder} alt='logo voyages'/>
        </figure>
        <p className="title_footer">Mes voyages</p>
      </Link>
      <Link className='link-footer' to="/profile">
        <figure className='logos-footer'>
          <img className='img-footer' src={profile} alt='logo parametres'/>
        </figure>
        <p className="title_footer">Profil</p>
      </Link>
    </div>
  )  
}

export default NavFooter;
