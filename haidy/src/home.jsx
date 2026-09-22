import React from 'react';
import Nav from './nav';
import Hero from './hero';
import Secon from './secon';
import Third from './third';
import Footer from './footer';
import Backg from './backg';

function home() {
    return (
        <div>
            <Secon/>
            <Hero/>
            <Third/>
            <Backg/>
            <Footer/>
        </div>
    )
}

export default home
