import React, { useState, useEffect } from 'react';
import Inicio from '../Inicio';
import Sobre from '../Sobre';
import Filme from '../Filme';

const Home = (props) => {

  return (
    <div>
      <Inicio/>
      <Sobre/>
      <Filme/>
    </div>
  );
}

export default Home;