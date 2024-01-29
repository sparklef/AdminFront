import React, { useState } from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';


export default function HtCard() {

    return (
        <div className='col-md-3 mb-4'>
            <div className="card">
                <img src="https://images.caradisiac.com/photo/4/9/7/4/144974/S4-s0-essai-video-mercedes-classe-g-2019-culte-579778-144974.jpg" alt='Produit' className='card-img-top img-fluid rounded' />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title'>Voiture 1</h5>
                    <p className='card-text'>Price: 205$</p>
                </div>
            </div>
        </div>
    );
}
