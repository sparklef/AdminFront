import React from "react";
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
// import { Link } from 'react-router-dom';
import Mylogo from './other/logo/vector/default-monochrome.svg';

export default function Head(){
    return(
        <header className=" navbar navbar-dark bg-dark shadow-sm d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src={Mylogo} alt=" " width="100%" height="50" />
      </a>
    </header>
    
    );
}