import Articolo from "./Articolo"
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
import DettaglioArticolo from "./DettaglioArticolo"
import { Link } from 'react-router-dom';
import { useArticoloContext } from '../../ArticoloContext';



export default function ListaArticoli(props) {
    const lista = props.articoli;
    const { setArticolo } = useArticoloContext();

    return (
        <MDBContainer>
            <MDBRow>
                {
                    lista.map((a) => {
                        if (!a.articolo.invisibile.booleanValue) {
                            const path = `/articolo/${encodeURIComponent(a.articolo.nome.stringValue)}/${encodeURIComponent(a.articolo.cod.stringValue)}`;

                            return (
                                <MDBCol md={4} key={a.id}>
                                    <Link to={{ pathname: path, state: { articolo: a } }} onClick={() => setArticolo(a)}>
                                        <Articolo key={a.id} articolo={a} />
                                    </Link>
                                </MDBCol>
                            )
                        }
                    })
                }
            </MDBRow>
        </MDBContainer>
    )
}