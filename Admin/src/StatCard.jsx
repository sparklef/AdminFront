import React from "react";
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';

export default function StatCard({ libelle, valeur }){
    return(
        <div class="card">
        {/* <img src="https://via.placeholder.com/150" class="card-img-top" alt="Image de la carte"/> */}
        <div class="card-body">
            <h5 class="card-title">{libelle}</h5>
            <p class="card-text h1 text-center">{valeur}</p>
        </div>
        </div>
    );
}