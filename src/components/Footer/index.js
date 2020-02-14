import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {

    return (
        <footer className="footer">
            <Link className="botao" to="/">Home</Link>
            <Link className="botao" to="/sobre">Sobre</Link>
        </footer>
    );
}

export default Footer;