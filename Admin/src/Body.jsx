import React, { useState, useEffect } from 'react';
import Card from './Card';
import Header from './Header';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Body() {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://autooccasionpart2-production.up.railway.app/api/annonce/annonces_non_validees');

        if (!response.ok) {
          throw new Error('Erreur lors de la recuperation des annonces');
        }

        const data = await response.json();
        setAllCards(data);
        setFilteredCards(data); // Initialiser filteredCards avec toutes les annonces
      } catch (error) {
        console.error('Erreur:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    // Mettez ici le code pour filtrer les annonces en fonction des dates sélectionnées
    const filtered = allCards.filter(card => {
      const cardDate = new Date(card.date_annonce).getTime();
      const minDateValue = minDate ? new Date(minDate).getTime() : 0;
      const maxDateValue = maxDate ? new Date(maxDate).getTime() : Infinity;

      return cardDate >= minDateValue && cardDate <= maxDateValue;
    });

    setFilteredCards(filtered);
  };

  if (!filteredCards) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <ProgressSpinner style={{ width: '50px', height: '100px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
    </div>
  );
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 text-center fixed">
            <h1>Filter</h1>
            <div className="form-floating mb-4">
              <input type="date" className="form-control" id="minDate" onChange={(e) => setMinDate(e.target.value)} />
              <label htmlFor="minDate">Date 1</label>
            </div>
            <div className="form-floating mb-4">
              <input type="date" className="form-control" id="maxDate" onChange={(e) => setMaxDate(e.target.value)} />
              <label htmlFor="maxDate">Date 2</label>
            </div>
            <button className="btn btn-success btn-lg btn-block" onClick={handleFilter}>
              Filter Annonce
            </button>
          </div>

          <ScrollPanel className="col-md-9" style={{ height: '100vh' }}>
            <h1 className="text-start">Annonce de voiture:</h1>
            <div className="row">{filteredCards.map(card => <Card key={card.idAnnonce} annonce={card.idAnnonce} prix={card.prix} idvoiture={card.idCar} date={card.date_annonce} sary={card.image_car} lieu={card.lieu} descs={card.description} />)}</div>
          </ScrollPanel>
        </div>
      </div>
    </>
  );
}
