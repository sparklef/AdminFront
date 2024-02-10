import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './assets/fontawesome-5/css/all.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Body from './Body';
import LogSign from './LogSign';
import Detail from './Detail';
import Stat from './Stat';
import CRUDCategorie from './CRUDCategorie';
import Marque from './CRUDMarque';
import Commission from './Comission';
// import Couleur from './CRUDCouleur';
// import Modifier from './Modifier';

function App() {
  return (
<Router>
<Routes>
  <Route path='/' element={<LogSign />} />
  <Route path='/annonce' element={<Body />} />
  <Route path='/detail' element={<Detail />} />
  <Route path='/stat' element={<Stat/>} />
  <Route path='/gestion' element={<CRUDCategorie/>} />
  <Route path='/marque' element={<Marque/>} />
  <Route path='/comission' element={<Commission/>} />
  {/* <Route path='/couleur' element={<Couleur/>} /> */}
  {/* <Route path='/modifier' element={<Modifier/>} /> */}
</Routes>
</Router>
  );
}

export default App;
