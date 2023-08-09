import Articolo from "./Articolo"
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
import DettaglioArticolo from "./DettaglioArticolo"

export default function ListaArticoli(props) {
    const lista = props.articoli;
    const [articoloSelezionato, setArticoloSelezionato] = useState(null);
    document.title = "ciao";

    return (
        <MDBContainer>
            {articoloSelezionato ? (
                // Mostra i dettagli dell'articolo se è stato selezionato
                <DettaglioArticolo articolo={articoloSelezionato} setArticoloSelezionato={setArticoloSelezionato}/>
            ) : (
                <MDBRow>
                    {
                        lista.map((a) => {
                            if (!a.articolo.invisibile.booleanValue) {
                                return <MDBCol md={4} key={a.id}>< Articolo key={a.id} articolo={a} setArticoloSelezionato={setArticoloSelezionato} /></MDBCol>
                            }
                        })
                    }
                </MDBRow>
            )}
        </MDBContainer>
    )

}