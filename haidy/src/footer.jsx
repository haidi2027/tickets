import React from 'react'
import { MDBFooter, MDBContainer, MDBCol, MDBRow, } from 'mdb-react-ui-kit';


function footer() {
    return (
        <div>

            <MDBFooter className='my-button text-white text-center'>
                <MDBContainer className='p-4'>
                    <MDBRow>
                        <MDBCol lg="6" md="12" className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>Your Movie Experience Starts Here</h5>

                            <p>
                                Discover the latest movies, explore showtimes,
                                and book your cinema tickets easily.
                                Enjoy a smooth and simple movie booking 
                                experience from start to finish.
                            </p>
                        </MDBCol>

                        <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>Company</h5>

                            <ul className='list-unstyled mb-0'>
                                <li>
                                    <a href='./' className='text-white'>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href='./about' className='text-white'>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href='./contact' className='text-white'>
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase mb-0'>Get in touch</h5>

                            <ul className='list-unstyled'>
                                <li>
                                    <a href='./movies' className='text-white'>
                                        +20 01155840286
                                    </a>
                                </li>
                                <li>
                                    <a href='./theaters' className='text-white'>
                                        haidiromany1@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2026 CinemaHub. 
                    All Rights Reserved.
                </div>
            </MDBFooter>
        </div>
    )
}

export default footer
