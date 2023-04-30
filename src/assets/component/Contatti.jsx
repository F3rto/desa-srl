import React from 'react';
import '../../App.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Contatti() {
  return (
    <div className='footer_contatti'>
      <MDBFooter bgColor='dark' variant="dark" className='text-center text-lg-start text-muted' id='contatti'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span><h6>I nostri social:</h6></span>
          </div>

          <div>
            <a target="_blank" href='https://www.facebook.com/people/Ricambi-DESA-Srl/100030213562898/?locale=it_IT' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a target="_blank" href='https://www.google.com/search?q=ricambi+desa+srl+vittoria&ei=_txOZJbOK8WB9u8PyoyIqAY&ved=0ahUKEwiWxfbcxdL-AhXFgP0HHUoGAmUQ4dUDCBA&uact=5&oq=ricambi+desa+srl+vittoria&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQogQyBQgAEKIEMgUIABCiBDoICAAQgAQQsANKBAhBGAFQ0AZY9gpggQ1oAXAAeACAAXKIAdECkgEDMy4xmAEAoAEByAEBwAEB&sclient=gws-wiz-serp' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a target="_blank" href='https://www.linkedin.com/in/de-s-a-vittoria-132093179' className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
          </div>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h5 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="cogs" className="me-3" />
                  Ricambi DE.S.A SRL
                </h5>
                <p>
                Ricambi DE.S.A è un'attività commerciale specializzata nella vendita di parti di ricambio e accessori per automobili, autocarri, mezzi agricoli e industriali. Offre una vasta gamma di prodotti, tra cui olio, filtri, batterie, freni, parti del motore e tanto altro. 
                </p>
              </MDBCol>

              
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contattaci</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  <a target="_blank" href="https://goo.gl/maps/oRyZA9SUhwoxGeRa6" className='text-reset'>
                    Via V. Veneto, 10, 97019 Vittoria RG
                  </a>
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                    <a target="_blank" href="mailto:ricambidesa@tiscali.it" className='text-reset'>
                      ricambidesa@tiscali.it
                    </a>                  
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" />
                    <a target="_blank" href="tel:+390932981528" className='text-reset'>
                      0932 981528
                    </a>    
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" />
                  <a target="_blank" href="fax:+390932981528" className='text-reset'>
                      0932 981528
                    </a>  
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          
        </div>
      </MDBFooter>
    </div>
  );
}