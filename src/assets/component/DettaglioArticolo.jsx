import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit";
import '../../App.css';
import { Slider } from './Slider';
import { useEffect } from "react";

export default function Articolo(props) {
    const a = props.articolo;
    const flag = Object.entries(a.imm.arrayValue).length !==0;

    const setArticoloSelezionato=props.setArticoloSelezionato;

    function handleClick() {
        setArticoloSelezionato(null);
    }

    useEffect(() => {
        document.title = a.nome.stringValue || 'Dettagli Articolo';
      }, [a]);

    return (
        <div className="articolo">
            <MDBCard alignment="start" className='mb-3 w-75' shadow="5">
                {flag?<Slider immagini={a.imm.arrayValue.values} />:<></>}
                <MDBCardBody alignment="left">
                    <MDBCardTitle>{a.nome.stringValue}</MDBCardTitle>
                    <MDBCardText>
                        <b>Codice articolo: </b>{a.cod.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Descrizione: </b>{a.descr.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Dimensioni: </b>{a.dim.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Codici equivalenti: </b>{a.codeq.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Prezzo: </b>{a.prezzo.stringValue}€
                    </MDBCardText>
                    <MDBCardText>
                        <span className="fw-light">Per qualsiasi informazione contattare il negozio.</span>
                    </MDBCardText>
                    <MDBBtn onClick={handleClick}>Indietro</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </div>
    )

}