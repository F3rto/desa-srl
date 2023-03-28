import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import logo from '../images/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import '../../App.css';

export default function NegozioReference() {
  return (
    <MDBCard>
      <MDBRipple rippleColor='dark' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={logo} fluid alt='DE.S.A SRL Ricambi' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Lista articoli</MDBCardTitle>
        <MDBCardText>
          Visita il nostro ampio catalogo di ricambi introvabili ed unici relativi ad auto storiche e tanto altro...
        </MDBCardText>
        <LinkContainer to='/negozio'>
        <MDBBtn color='dark'>Lista articoli</MDBBtn>
        </LinkContainer>
      </MDBCardBody>
    </MDBCard>
  );
}