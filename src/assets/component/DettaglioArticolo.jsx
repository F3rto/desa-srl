import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit";
import '../../App.css';
import { Slider } from './Slider';
import { useArticoloContext } from '../../ArticoloContext';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function DettaglioArticolo(props) {
    const { articolo, setArticolo } = useArticoloContext();
    const { codice: cod } = useParams(); // Recupera il parametro `cod` dall'URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const [a, setA] = useState(articolo ? articolo.articolo : null);

    const [flag, setFlag] = useState(null);

    // Funzione helper per normalizzare i valori (gestisce `stringValue`)
    const getCodValue = (codField) => {
        return codField?.stringValue || codField; // Usa stringValue se esiste, altrimenti il valore originale
    };

    const getArrValue = (field) => {
        return field?.arrayValue || field; // Usa stringValue se esiste, altrimenti il valore originale
    };

    useEffect(() => { 
        if (a) {
            setFlag(a.imm && getArrValue(a.imm) && Object.entries(getArrValue(a.imm)).length !== 0);
        } 
    }, [a]);

    useEffect(() => {
        if (!articolo) {
            const fetchArticolo = async () => {
                try {
                    const db = getFirestore();
                    const articoliRef = collection(db, "articoli");
                    const q = query(articoliRef, where("a.cod", "==", cod)); // Query per `a.cod`
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const docData = querySnapshot.docs[0].data();
                        setArticolo({ articolo: docData.a }); // Aggiorna il contesto
                        setA(docData.a);
                    } else {
                        console.error("Articolo non trovato");
                        navigate("/negozio");
                    }
                } catch (error) {
                    console.error("Errore durante il fetch dell'articolo:", error);
                    navigate("/negozio");
                } finally {
                    setLoading(false);
                }
            };

            fetchArticolo();
        } else {
            setLoading(false);
        }
    }, [articolo, cod, navigate, setArticolo]);

    return (
        <>
        { a == null && flag == null ? null :
            <div className="articolo">
                <Helmet>
                    <title>{getCodValue(a.nome) + " " + getCodValue(a.cod)} - Ricambi Desa</title>
                    <meta
                        name="description"
                        content={
                            getCodValue(a.nome) +
                            " " +
                            getCodValue(a.cod) +
                            " disponibile su Ricambi Desa. Scopri di più sui nostri prodotti di alta qualità."
                        }
                    />
                </Helmet>
                <MDBCard alignment="start" className="mb-3 w-75" shadow="5">
                    {flag ? <Slider immagini={getArrValue(a.imm)} /> : <></>}
                    <MDBCardBody alignment="left">
                        <MDBCardTitle>{getCodValue(a.nome)}</MDBCardTitle>
                        <MDBCardText>
                            <b>Codice articolo: </b>
                            {getCodValue(a.cod)}
                        </MDBCardText>
                        <MDBCardText>
                            <b>Descrizione: </b>
                            {getCodValue(a.descr)}
                        </MDBCardText>
                        <MDBCardText>
                            <b>Dimensioni: </b>
                            {getCodValue(a.dim)}
                        </MDBCardText>
                        <MDBCardText>
                            <b>Codici equivalenti: </b>
                            {getCodValue(a.codeq)}
                        </MDBCardText>
                        <MDBCardText>
                            <b>Prezzo: </b>
                            {getCodValue(a.prezzo)}€
                        </MDBCardText>
                        <MDBCardText>
                            <span className="fw-light">Per qualsiasi informazione contattare il negozio.</span>
                        </MDBCardText>
                        <Link to={"/negozio"}>
                            <MDBBtn>Indietro</MDBBtn>
                        </Link>
                    </MDBCardBody>
                </MDBCard>
            </div>
        }
        </>
    );
}
