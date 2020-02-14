import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Home = (props) => {

  const { params } = props.match;

  const [data, setData] = useState([]);
  const url = "https://sujeitoprogramador.com/r-api/?api=filmes";

  useEffect(
    () => {
      const loadData = async () => {
        const response = await Axios.get(url);
        setData(response.data);
        console.log(data);
      };
      loadData();
    },
    [url]
  );

  return (
    <div className="lista-filmes">
      {data.map((item) => {
        return (
          <article key={item.id}>
            <strong>{item.nome}</strong>
            <img className="foto" src={item.foto}></img>
            <Link to={`/filme/${item.id}`}>Acessar</Link>
          </article>
        );
      })}
    </div>
  );
}

export default Home;