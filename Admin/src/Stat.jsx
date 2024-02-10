import {useEffect, useState} from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import Header from './Header';
import StatCard from './StatCard';
// import StatCamembert from './StatCamembert';
import Courbe from './Courbe';

export default function Stat() {

  const [statistique, setStatistique] = useState(null);
  const [categorie, setCategorie] = useState([]);
  const [nbcategorie, setNbcategorie] = useState([]);

  const [Marque, setMarque] = useState([]);
  const [Nbmarque, setNbmarque] = useState([]);

    const [Couleur, setCouleur] = useState([]);
  const [nbCouleur, setNbCouleur] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/statistique/stat');

        if(!reponse.ok){
          throw new Error('Erreur lors de la recuperation des statistique');
        }

        const data = await reponse.json();
        setStatistique(data);
      }catch(error){
        console.error("Erreur :", error.message);
      }
    };
    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/statistique/statistiques');

        if(!reponse.ok){
          throw new Error('Erreur lors de la recuperation des statistique');
        }

        const data = await reponse.json();

        const ctg = data.map(item => item.categorie);
        const nbCtg = data.map(item => item.nbcategorie);

        const mq = data.map(item => item.marque);
        const nbMq = data.map(item => item.nbmarque);

        const cl = data.map(item => item.couleur);
        const nbcl = data.map(item => item.nbcouleur);

        setCategorie(ctg);
        setNbcategorie(nbCtg);

        setMarque(mq);
        setNbmarque(nbMq);

        setCouleur(cl);
        setNbCouleur(nbcl);

      }catch(error){
        console.error("erreur", error.message);
      }
    };

    fetchData();
  }, []);


  if(!statistique){
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
      <Header></Header>
      <div className='container-fluid'>
        <div className='row mb-3 text-center'>
        <div className='col-md-12 themed-grid-col text-center'>
  <div className='pb-3 h3'>
    donnees statistique
  </div>

  <div className='row'>
    <div className='col-md-6'>
      <div className='row justify-content-center'>
        <StatCard libelle="Nombre utilisateur" valeur={statistique.totalutilisateur}/>
      </div>
      <div className='py-3'></div>
    </div>

    <div className='col-md-6'>
      <div className='row justify-content-center'>
        <StatCard libelle="nombre d'annonce confirmer" valeur={statistique.nombreannonceconfirmer}/>
      </div>
      <div className='py-3'></div>
    </div>
  </div>

  <div className='row'>
    <div className='col-md-6'>
      <div className='row justify-content-center'>
        <StatCard libelle="nombre de voiture" valeur={statistique.totalvoiture}/>
      </div>
      <div className='py-3'></div>
    </div>

    <div className='col-md-6'>
      <div className='row justify-content-center'>
        <StatCard libelle="Chiffre d'affaire (commission 20% sur chaque annonce)" valeur={statistique.chiffreaffaire}/>
      </div>
      <div className='py-3'></div>
    </div>
  </div>
</div>

        </div>
        </div>
        <div className='py-3'></div>
        <div className='container-fluid justify-content-center'>
        <div className='row mb-3 text-center'>
          <div className='col-md-4 themed-grid-col mr-md-3'>
            <div className='pb-3 h3'>
              Marque
            </div>
            <div className='row'>
              <Courbe labels={Marque} datas={Nbmarque}/>
            </div>
          </div>
          <div className='col-md-4 themed-grid-col mr-md-3'>
            <div className='pb-3 h3'>
              Categorie
            </div>
            <div className='row'>
              <Courbe labels={categorie} datas={nbcategorie} />
            </div>
          </div>
          <div className='col-md-4 themed-grid-col mr-md-3'>
            <div className='pb-3 h3'>
              Couleur
            </div>
            <div className='row'>
              <Courbe labels={Couleur} datas={nbCouleur} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
