import React from 'react';
import './css/header.css';
import HamburgerMenu from './hamburgerMenu';

function Header() {
        return (
            <header>
                <HamburgerMenu />
                <h1 id="app-name">Flickr Photo-Plotter App</h1>
            </header>
        )
}

export default Header;
