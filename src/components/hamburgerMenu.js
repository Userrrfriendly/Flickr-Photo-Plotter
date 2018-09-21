import React from 'react';

class HamburgerMenu extends React.Component {
    handleClick = () => {
        const aside = document.getElementById('left-aside');
        const asideContent = document.getElementById('aside-content');

        if (!aside.classList.contains('hidden')) {
            asideContent.classList.add('flipOutY');
            window.setTimeout(()=>{
                aside.classList.add('hidden');
            },700)
        } else {
            aside.classList.remove('hidden');
            asideContent.classList.remove('flipOutY');
            asideContent.classList.add('flipInY');
        }
    }

    render () {
        return (
            <button aria-label="Show/hide marker list" className="hamburger" onClick={this.handleClick}></button>
        )
    }
}

export default HamburgerMenu;