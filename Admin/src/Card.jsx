import React from 'react';

import { Link } from 'react-router-dom';

import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';


export default function Card({annonce,idvoiture,prix,date, image, lieu, descs}) {
    const datePart = date.split('T')[0];
    return (
        <div className='col-md-4 mb-4'>
            <div className="card">
                <img src={image} alt='image de vehicule' className='card-img-top img-fluid rounded' />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title h3'>Prix :{prix}Ar</h5>
                    {/* <p className='card-text h4'>Price: {prix} Ar</p> */}
                    <p className='card-text'>Date annonce: {datePart}</p>
                    <p className='card-text'>Description: {descs}</p>
                    <p className='card-text'>lieu: {lieu}</p>
                   <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&prix=${encodeURIComponent(prix)}&annonce=${encodeURIComponent(annonce)}&image=${encodeURIComponent(image)}`}> <button className='btn btn-success btn-lg' >details annonce</button></Link>
                   {/* <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&annonce=${encodeURIComponent(annonce)}`}> <button className='btn btn-success btn-lg' >details annonce</button></Link> */}
                </div>
            </div>
        </div>
    );
}
