import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navbar2() {
    const [showNavText, setShowNavText] = useState(false);

    return (
        <MDBNavbar fixed='top' expand='lg' dark bgColor='dark'>
            <MDBContainer fluid>
                <LinkContainer to="/">
                    <MDBNavbarBrand>DE.S.A SRL</MDBNavbarBrand>
                </LinkContainer>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarText'
                    aria-controls='navbarText'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavText(!showNavText)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavText}>
                    <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <LinkContainer to="/">
                                <MDBNavbarLink>
                                    Home
                                </MDBNavbarLink>
                            </LinkContainer>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#contatti'>Contatti</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <LinkContainer to="/negozio">
                                <MDBNavbarLink>Negozio</MDBNavbarLink>
                            </LinkContainer>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end'>
                        <MDBNavbarItem>
                            <LinkContainer to="/private">
                                <MDBNavbarLink>Area Admin</MDBNavbarLink>
                            </LinkContainer>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}