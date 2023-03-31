import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
import '../../App.css'

export default function LoadingModel() {
    return (
        <MDBSpinner role='status' size='sm'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    );
}