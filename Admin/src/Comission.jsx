import React, {useState } from 'react';
import Header from './Header';
import Crud from './Crud';
// import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';
        


export default function Commission() {
    const [com, setCom] = useState('');
    // const [newCom, setNewCom] = useState('');
    const insertCommission = async () => {
      try {
        console.log('Sending request with body:', JSON.stringify({ commission_pourcent: parseFloat(com) }));
    
        const response = await fetch('https://autooccasionpart2-production.up.railway.app/api/commission/insert', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ commission_pourcent: parseFloat(com) }),
        });
    
        console.log('Server response:', response);
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error (${response.status}): ${errorText}`);
          throw new Error('Erreur lors de la creation de la commission');
        }
    
        const data = await response.json();
        console.log('Server data:', data);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    const confirm=(event)=>{
        confirmPopup({
          target:event.currentTarget,
          message:"Voulez vous vraiment ajouter une nouvelle commission cette categorie ?",
          acceptLabel:"Confirmer",
           rejectLabel:"Annuler",
           accept:()=>insertCommission()
        })
      }
  return (
    <>
<Header/>
<ConfirmPopup/>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className='container'>
          <h1 className="text-start">Commission:</h1>
          <div className="row">
            
            <form className="mb-3">
              <div className="input-group">
                <input type="text" className="form-control" value={com} onChange={(e) => setCom(e.target.value)} name='AddCategorie' placeholder="Modifier la commission" />
                <button type="button" className="btn btn-warning" onClick={(e) => {e.preventDefault(); confirm(e)}}><i className='fas fa-plus' ></i> Ajouter</button>
              </div>
            </form>

          </div>
          </div>
        </div>
        
        <Crud/>
      </div>
    </div>
    </>
  );
}

