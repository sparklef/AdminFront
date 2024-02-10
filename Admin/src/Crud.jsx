import React from 'react';
import { Link } from 'react-router-dom';
// import Header from './Header';

export default function Crud() {

  return (
        <div className="col-md-3 text-center fixed">
          <h1>toutes les gestions</h1>
          <div className="mb-4">
          <Link to="/gestion" ><button className="btn btn-success btn-lg w-100 btn-block">Gestion categorie</button></Link>
          </div>
          <div className="mb-4">
          <Link to="/marque" ><button className="btn btn-success btn-lg w-100 btn-block">Gestion Marque </button></Link>
          </div>
          <div className="mb-4">
          <Link to="/comission" ><button className="btn btn-success btn-lg w-100 btn-block">Commission </button></Link>
          </div>
        </div>
  );
}

