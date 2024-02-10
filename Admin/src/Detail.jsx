import React, {useRef,useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import Header from './Header';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method


export default function Detail() {
  const [voitureDetails, setVoitureDetails] = useState(null);
    const toast = useRef(null);
    const location = useLocation();
    const nav = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const idVoiture = searchParams.get('idVoiture');
    const prix = searchParams.get('prix');
    const idAnnonce = searchParams.get('annonce');
    const sary = searchParams.get('image');
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/voiture/findOne/${idVoiture}`);
  
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails de la voiture');
          }
  
          const data = await response.json();
          setVoitureDetails(data);
        } catch (error) {
          console.error('Erreur :', error.message);
        }
      };
  
      fetchData();
    }, [idVoiture]);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Ajout', detail:'Annonce Accepter', life: 3000});
    }
  
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Suppresion', detail:'Annonce Refuser', life: 3000});
  }

  const AcceptAnnonce = () => {
  
    const accept = async () => {
      try {
        const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/admin/validate_annonce/${idAnnonce}`, {
          method: 'PUT',
        });
  
        if (!response.ok) {
          throw new Error('annonce non valide');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(data.message);
          
        } else {
          showSuccess();
          nav('/annonce');
          console.error('Erreur : Réponse non JSON');
        }
      } catch (error) {
        console.error('Erreur :', error.message);
      }
    };
    accept();
  };
  
  const DeleteAnnonce = () =>{
    const del = async () =>{
      try {
        const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/annonce/delete_annonce/${idAnnonce}`,{
          method:'DELETE',
        });

        if(!reponse.ok){
          throw new Error('annonce non supprimer');
        }
        const contenttype = reponse.headers.get('content-type');
        if(contenttype && contenttype.includes('application/json')){
          const data = await reponse.json();
          console.log(data.message);
        }else{
          showError();
          nav('/annonce');
        }
      } catch (error) {
        console.error('Erreur :' , error.message);
      }
    };
    del();
  };
  
  const confirm = (event)=>{
    confirmPopup({
      target: event.currentTarget,
      message:"Voulez vous vraiment supprimer cette annonce",
      acceptLabel:"Confirmer",
      rejectLabel:"Annuler",
      accept: ()=> DeleteAnnonce()
    })
  }

  if (!voitureDetails) {
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
        <Toast ref={toast} position="top-center" />
        <ConfirmPopup/>
        {/* <h1>Détails de la voiture avec l'ID : {idVoiture}</h1> */}
        <div className='container-lg'>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3" style={{ height: '100vh' }}>
          <h1 className="display-4 fw-bold lh-1">{voitureDetails.nom_voiture}</h1>
          <div className='py-4' ></div>

          <table className=' table table-responsive table-stripped' >
            <thead>
                <th> marque:</th>
                <th className='text-end text-secondary'>{voitureDetails.marque_voiture.marque}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>

          <div className='py-3' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th> Modele:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.modele}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>
            <div className='py-3' ></div>
            <table className=' table table-responsive table-stripped' >
            <thead>
                <th>nombre de porte:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.nbr_portes}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-3' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th> annee de mise en circulation:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.annee}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>

          <div className='py-3' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th>Boite de vitesse:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.boite_devitesse}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>

          <div className='py-3' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Moteur</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.source_energie}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>

          <div className='py-3' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Couleur</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.couleur}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>

          <div className='py-3' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Prix</th>
                <th className='text-end text-secondary' >{prix}Ar</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>          </table>
          <div className='py-3' ></div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold" onClick={AcceptAnnonce} ><i className='fas fa-check' ></i> Accepter</button>
            <button type="button" className="btn btn-danger btn-lg px-4 me-md-2 fw-bold" onClick={(e) => {e.preventDefault();confirm(e)}} ><i className='fas fa-times' ></i> Reffuser</button>
          </div>
          
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden">
            <img className="rounded-lg-3" src={sary} alt="" width="720"/>
            
        </div>
      </div>
      </div>
      </>
    );
}
