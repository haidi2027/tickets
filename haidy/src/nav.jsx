import React from 'react';
import {Link }from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

const nav = () => {
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
            <div className='divsearch'>
                <MDBBtn  color='danger' style={{color:"white", display:"flex" , justifyContent:"center" , width:"20px", boxShadow:"none"}} >LogIn</MDBBtn>  
            </div>
        </nav>
        
        </>
    )
}

export default nav
