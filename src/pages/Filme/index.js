import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Filme = (props) => {

  const [data, setData] = useState([]);
  const url = "https://sujeitoprogramador.com/r-api/?api=filmes";

  useEffect(
    () => {
      const loadData = async () => {
        const response = await Axios.get(`${url}/123`);
        setData(response.data);
        console.log(data);
      };
      loadData();
    },
    [url]
  );

  return (
    <div className="filme" id="filme">
      {data.id > 0 &&
        <article key={data.id}>
          <strong>{data.nome}</strong>
          <img src={data.foto}></img>
          <div className="sinopse"><b>Sinopse:</b><br />{data.sinopse}</div>
        </article>
      }
    </div>
  );
}

export default Filme;