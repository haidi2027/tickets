import React from 'react';
import {Link }from 'react-router-dom';
const Nav = () => {
    return (
        <>
        
        
        <nav className='nav'>
            
            <Link to="/" className='link'>Home</Link>
            <Link to="/movies" className='link'>Movies</Link>
            <Link to="/series" className='link'> Series</Link>
            <Link to="/cartoon" className='link'>Cartoon</Link>
            
            <div className='logo'>
                <h1>Cinema <span>TV</span></h1>
            </div>
        
        </nav>
        
        </>
    )
}

export default Nav
