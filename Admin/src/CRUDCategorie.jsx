import React, { useEffect, useRef,useState } from 'react';
import Header from './Header';
import Crud from './Crud';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
        


export default function Categorie() {
  const toast = useRef(null);
  const [idCategorieToUpdate,setIdCategorieToUpdate]=useState(0);
  const [visible, setVisible] = useState(false);
  const [categorie, setCategorie] = useState([]);
  const [newCategorie, setNewCatgorie] = useState('');
  const [categorieUpdate, setCategorieUpdate] = useState('');

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/categorie/allCategorie');
        
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

//   const showSuccess = () => {
//       toast.current.show({severity:'success', summary: 'Success', detail:'Ajouter avec succes', life: 3000});
//   }

//   const showError = () => {
//     toast.current.show({severity:'error', summary: 'Error', detail:'Element Supprimer', life: 3000});
// }

const AddCategorie = async () => {
  try {
    const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/categorie/insert', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({categorie : newCategorie}),
    }).then((item)=>{
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
const deleteCategorie = async (idCategorie) => {
  try {
    const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/categorie/delete/${idCategorie}`, {
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json',
      },
    }).then((item)=>{
      window.location.reload();
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression');
    }
    

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

const updateCategories = async (idCategorie) => {
  try {
    const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/categorie/update/${idCategorie}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ categorie : categorieUpdate }),
    });

    if (!reponse.ok) {
      throw new Error('Erreur lors de la mise à jour de la catégorie');
    }

    const data = await reponse.json();
    console.log(data);

  } catch (error) {
    console.error(error.message);
  }
  // setVisible(false);
  window.location.reload()
};


const confirm=(event,id)=>{
  confirmPopup({
    target:event.currentTarget,
    message:"Voulez vous vraiment supprimer cette categorie ?",
    acceptLabel:"Confirmer",
     rejectLabel:"Annuler",
     accept:()=>deleteCategorie(id)
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
    <Dialog header="Modification" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
      <div className="m-0">
        <h1 className='text-center' >Modification d'un elements</h1>
        {/* <form className=""> */}
          <input type="hidden" value={idCategorieToUpdate} name="idCategorie" />
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-3" id="floatingInput" value={categorieUpdate} onChange={(e) => setCategorieUpdate(e.target.value)}/>
            <label for="floatingInput">Categorie:</label>
          </div>
          <div className='text-center' >
          <button className="w-50 mb-2 btn btn-lg rounded-3 btn-warning" onClick={() => updateCategories(idCategorieToUpdate)} type="submit"><i className='fas fa-pen' ></i>Modifier</button>
          </div>
        {/* </form> */}
      </div>
    </Dialog>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className='container'>
          <h1 className="text-start">Gestion des Categories:</h1>
          <div className="row">
            
            <form className="mb-3">
              <div className="input-group">
                <input type="text" className="form-control" value={newCategorie} onChange={(e) => setNewCatgorie(e.target.value)} name='AddCategorie' placeholder="Nouvelle Catégorie" />
                <button type="button" className="btn btn-primary" onClick={AddCategorie} ><i className='fas fa-plus' ></i> Ajouter</button>
              </div>
            </form>

            <table className='table table-sm table-borderless text-center' >
              <thead className='table-dark' >
                <tr>
                  <th>code Categorie</th>
                  <th>catgorie</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='table-striped' >

                {categorie.map((cat) =>(
                <tr key={cat.id}>
                  <th>{cat.idCategorie}</th>
                  <th>{cat.categorie}</th>
                  <th>
                    <button className='btn btn-warning ' onClick={() => {
                      setVisible(true);
                      setIdCategorieToUpdate(cat.idCategorie);
                      }
                    } ><i className='fas fa-pen' ></i> Modifier</button>  <button type='button' className='btn btn-danger ' onClick={(e) => {e.preventDefault();confirm(e,cat.idCategorie)}} ><i className='fas fa-trash-alt' ></i> Supprimer</button>
                  </th>
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

