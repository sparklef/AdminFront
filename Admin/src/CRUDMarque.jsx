import React, { useEffect, useRef,useState } from 'react';
import Header from './Header';
import Crud from './Crud';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';

export default function Categorie() {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [categorie, setCategorie] = useState([]);
  const [newCategorie, setNewCatgorie] = useState('');
  const [marque, setMarque] = useState('');
  const [idMarqueUpdate, setIdMarqueUpdate] = useState(0);

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/marque/all');
        
        if(!reponse.ok){
          throw new Error ('erreur lors de la recuperation des details');
        }

        const data = await reponse.json();
        setCategorie(data);
      } catch (error) {
        console.error('Erreur :', error.message);
      }
    };
    fetchData();
  }, []);


const AddMarque = async () => {
  try {
    const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/marque/create', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({marque : newCategorie}),
    }).then((item) => {
      window.location.reload();
    });

    if(!reponse.ok){
      throw new Error('Erreur lors de la creation de la categorie');
    }

    const data = await reponse.json();
    console.log(data);

  } catch (error) {
    console.error('Erreur:', error.message);
  }
};

const DeleteMarque = async (idMarque) => {
  try {
    const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/marque/delete/${idMarque}`, {
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json',
      },
    }).then((item)=>{
      window.location.reload();
    })

    if(!reponse.ok){
      throw new Error('Erreur lors de la suppression');
    }

    const data = await reponse.json();
    console.log(data);

  } catch (error) {
    console.error(error.message);
  }
};

const UpdateMarque = async (idMarque) => {
  try {
    const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/marque/update/${idMarque}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ marque : marque }),
    });

    if(!reponse.ok){
      throw new Error ('Erreur lors de la mise a jour');
    }

    const data = await reponse.json();
    console.log(data);

  } catch (error) {
    console.error(error.message);
  }

  window.location.reload();
}

const confirm=(event,id)=>{
  confirmPopup({
    target:event.currentTarget,
    message:"Voulez vous vraiment supprimer cette marque ?",
    acceptLabel:"Confirmer",
     rejectLabel:"Annuler",
     accept:()=>DeleteMarque(id)
  })
}

if (!categorie) {
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
    <Header/>
    <Toast ref={toast} position="top-center" />
    <ConfirmPopup/>
    <Dialog header="Header" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
      <div className="m-0">
        <h1 className='text-center' >Modification d'un elements</h1>
        {/* <form class=""> */}
          <div class="form-floating mb-3">
            <input type="hidden" name="idCategorie" />
            <input type="text" class="form-control rounded-3" value={marque} onChange={(e) => setMarque(e.target.value)} id="floatingInput"/>
            <label for="floatingInput">Marque:</label>
          </div>
          <div className='text-center' >
          <button class="w-50 mb-2 btn btn-lg rounded-3 btn-warning" type="submit" onClick={() => UpdateMarque(idMarqueUpdate)} ><i className='fas fa-pen' ></i>Modifier</button>
          </div>
        {/* </form> */}
      </div>
    </Dialog>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className='container'>
          <h1 className="text-start">Gestion des Marques:</h1>
          <div className="row">
            
            <form className="mb-3">
              <div className="input-group">
                <input type="text" className="form-control" value={newCategorie} onChange={(e) => setNewCatgorie(e.target.value)} name='AddCategorie' placeholder="Nouvelle Catégorie" />
                <button type="button" className="btn btn-primary" onClick={AddMarque} ><i className='fas fa-plus' ></i> Ajouter</button>
              </div>
            </form>

            <table className='table table-sm table-borderless text-center' >
              <thead className='table-dark' >
                <tr>
                  <th>code marque</th>
                  <th>marque</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='table-striped' >

                {categorie.map((cat) =>(
                <tr>
                  <th>{cat.idMarque}</th>
                  <th>{cat.marque}</th>
                  <th><button className='btn btn-warning ' onClick={() => {
                    setVisible(true);
                    setIdMarqueUpdate(cat.idMarque);
                    }} ><i className='fas fa-pen' ></i> Modifier</button>  <button className='btn btn-danger' onClick={(e) => {e.preventDefault();confirm(e,cat.idMarque)}} ><i className='fas fa-trash-alt' ></i> Supprimer</button></th>
                </tr>
                ))}
                
              </tbody>
            </table>

          </div>
          </div>
        </div>
        
        <Crud/>
      </div>
    </div>
    </>
  );
}

