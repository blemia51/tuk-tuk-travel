import React from "react";
import {Link} from 'react-router-dom';
import logoOk from '../assets/img/logoOk.png';
import '../assets/css/App.css';

const AddUser = () => {
  return (
    <div className='addUser'>
      <Link className='link-footer' to="/home">
        <figure className='logo-ok'>
          <img src={logoOk} alt='logo Ok'/>
        </figure>
        <p className="user-added">Utilisateur ajouté</p>
      </Link>
    </div>
  )
}

export default AddUser;
