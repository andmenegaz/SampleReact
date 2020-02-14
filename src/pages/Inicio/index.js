import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Inicio = (props) => {

  return (
    <div className = "inicio" id="inicio">
      <h1>Bem-vindo a Home</h1>
      <h2>Aprendendo SPA na pratica com React JS</h2>
      <h3>evoluindo a cda dia</h3>
    </div>
  );
}

export default Inicio;