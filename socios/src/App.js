import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screen/Login';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Table from './screen/Table';
import Cuota from './screen/Quota';
import ConfigQ from './screen/ConfigQ';
import ConfigCuota from './components/ConfigQuota'
import Pay from './screen/Pay';
import EditarPago from './components/EditPayment';
import PagoForm from './components/PayForm';
import EditarSocio from './components/EditMember';
import AgregarSocio from './components/AddMember';
import PagosRealizados from './components/DataPay'
import EditQuota from './components/EditQuota';
import ManageTypeQuota from './components/ManageTypeQuota';
import AddQuotaMember from './components/AddQuotaMember';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/perfil' element={<Profile />} />
        <Route exact path='/table' element={<Table />} />
        <Route exact path='/cuota' element={<Cuota />} />
        <Route exact path='/config-cuota' element={<ConfigQ />} />        
        <Route exact path='/pay' element={<Pay />} /> 
        <Route path="/pagar-cuota/:id" element={<PagoForm />} />
        <Route path="/editar-socio/:nro_socio" element={<EditarSocio />} />
        <Route path="/agregar-socio" element={<AgregarSocio />} /> 
        <Route path="/pagos-realizados/:id" element={<PagosRealizados />} /> 
        <Route path="/editar-cuota/:id" element={<EditQuota />} /> 
        <Route path="/tipos-cuota" element={<ManageTypeQuota />} /> 
        <Route path="/asignar-cuota" element={<AddQuotaMember />} /> 

        <Route path="/editar-pago/:id" element={<EditarPago />} />  
        <Route exact path='/configuracion-cuotas' element={<ConfigCuota />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
