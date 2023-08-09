import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCardImage } from "mdb-react-ui-kit";
import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../../firebase";
import '../../App.css';
import { Slider } from './Slider';

export default function Articolo(props) {
    const a = props.articolo.articolo
    const flag = Object.entries(a.imm.arrayValue).length !==0

    const immagine = a.imm.arrayValue.values[0].stringValue;
    const [url, setUrl] = useState([]);

    const setArticoloSelezionato=props.setArticoloSelezionato;
    
    useEffect(() => {
        async function getUrls() {
            const r = ref(storage, immagine);
            const urlPromises = getDownloadURL(r);
            const url = await Promise.resolve(urlPromises)
            setUrl(url);
        }
        getUrls();
    }, [immagine])

    function handleClick() {
        setArticoloSelezionato(a);
    }

    return (
        <div className="articolo zoomArticolo" onClick={handleClick}>
            <MDBCard alignment="start" className='mb-3 w-75' shadow="5">
                {flag?<MDBCardImage src={url} position="top" alt="Foto"/> :<></>}
                <MDBCardBody alignment="left">
                    <MDBCardTitle>{a.nome.stringValue}</MDBCardTitle>
                    <MDBCardText>
                        <b>Cod: </b>{a.cod.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Descrizione: </b>{a.descr.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Cod Eq: </b>{a.codeq.stringValue}
                    </MDBCardText>
                    <MDBCardText>
                        <b>Prezzo: </b>{a.prezzo.stringValue}€
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    )

}