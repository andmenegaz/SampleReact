import React from 'react';
import {HashLink as Link} from 'react-router-hash-link'

const Header = (props) => {

    return (
        <header className="header">
            <nav>
                <ul>
                    <li><Link smooth to="#inicio">Home</Link></li>
                    <li><Link smooth to="#sobre">Sobre</Link></li>
                    <li><Link smooth to="#filme">Filme</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;