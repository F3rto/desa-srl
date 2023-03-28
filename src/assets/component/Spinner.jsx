import React from 'react';
import piston from '../images/piston.gif'

export default function Spinner() {
    return (
        <div className='justify-content-center'>
            <img src={piston} className='img-fluid' alt='Loading...' />
            <h6 className='text-muted'><small>Loading...</small> </h6>
        </div>

    );
}