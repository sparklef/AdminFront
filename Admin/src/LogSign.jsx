import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Head from "./Head";

export default function LogSign() {
  const toast = useRef(null);
  const [username, setUsername] = useState('admin1@example.com');
  const [password, setPassword] = useState('admin');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://autooccasionpart2-production.up.railway.app/api/admin/allAdmin');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des administrateurs');
        }

        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('Erreur:', error.message);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  //suppabase a un 

  const handleLogin = () => {
    const isAdmin = admins.some(admin => username.toLowerCase() === admin.email.toLowerCase() && password === admin.mdp);

    if (isAdmin) {
      navigate('/annonce');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Head></Head>
      <Toast ref={toast} position="top-center" />
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">CarReflexe Admin page</h1>
            <p className="col-lg-10 fs-4">
              Bienvenue sur CarReflexe, ceci est la page de connexion pour les administrateurs. Entrez vos informations de connexion pour vous connecter en tant qu'administrateur.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <div className="text-center h2">Log in</div>
              <div className="py-3"></div>
              <div className="form-floating mb-3 col-12">
                <input type="email" className="form-control" style={{ height: "60px" }} id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="py-3"></div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" style={{ height: "60px" }} id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="py-2"></div>
              <button className="w-100 btn btn-lg btn-success" type="button" onClick={handleLogin}>Log in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
