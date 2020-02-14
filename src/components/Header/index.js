import React from 'react';

const Header = (props) => {

    return (
        <header className="header">
            <strong>{props.title}</strong>
        </header>
    );
}

export default Header;