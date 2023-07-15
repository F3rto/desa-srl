import { useState } from "react";
import {MDBCard, MDBFile, MDBCardBody, MDBCardTitle, MDBInput, MDBTextArea, MDBBtn, MDBCheckbox} from "mdb-react-ui-kit";
import '../../App.css'
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import LoadingModel from './LoadingModel'
import Modal from "./Modal";

export default function AddArticolo(props) {
    const show = props.show;
    const showAdd = props.set;

    const articoloCollectionRef = collection(db, "articoli");

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("---");
    const [cod, setCod] = useState("---");
    const [codeq, setCodeq] = useState("---");
    const [dim, setDim] = useState("---");
    const [descr, setDescr] = useState("---");
    const [prezzo, setPrezzo] = useState("---");
    const [imm, setImm] = useState([]);
    const [invisibile, setInvisibile] = useState(false);
    
    const [aggiuntoModal, setAggiuntoModal] = useState(false);
    const aggiuntoShow = () => {setAggiuntoModal(!aggiuntoModal)}
    
    const [erroreModal, setErroreModal] = useState(false);
    const erroreShow = () => {setErroreModal(!erroreModal)}
    
    const [cancellaModal, setCancellaModal] = useState(false);
    const cancellaShow = () => {setCancellaModal(!cancellaModal)}
    
    const chiudi = () => {setAggiuntoModal(false);setErroreModal(false);setCancellaModal(false);showAdd(false);}

    
    async function aggiungi() {
        /**
         * passo all'oggetto Articolo nel campo imm, un array di stringhe con path relativi alle immagini dell'articolo, otterrò le ref con il metodo ref()
         */
        
        let img = [];
        let a = {
            imm: img,
            nome: nome,
            cod: cod,
            descr: descr,
            dim: dim,
            codeq: codeq,
            prezzo: prezzo,
            invisibile: invisibile
        }
        try {
            setLoading(true);
            for (let i = 0; i < imm.length; i++) {
                let string = 'images/' + imm[i].name + v4();
                const immRef = ref(storage, string);
                img.push(immRef.fullPath) //or img.push(string);
                await uploadBytes(immRef, imm[i]);
            }
            await addDoc(articoloCollectionRef, { a });
            aggiuntoShow();
            props.fun();
            //window.location.reload(false);
        } catch (error) {
            erroreShow();
        } finally {
            setLoading(false);
        }
    }
    function elimina() {
        cancellaShow();
    }

    return (
        <>
            {
                show && <MDBCard className='mb-3 w-75' shadow="5">

                    <br />
                    <MDBCardTitle>Nuovo Articolo</MDBCardTitle>
                    <MDBCardBody>
                        <MDBFile onChange={(e) => { setImm(e.target.files) }} multiple accept="image/*" id='customFile' />
                        <br />
                        <MDBInput onChange={(e) => { setNome(e.target.value) }} label="Nome Articolo" id="nome" type="text" />
                        <br />
                        <MDBInput onChange={(e) => { setCod(e.target.value) }} label="Codice Articolo" id="cod" type="text" />
                        <br />
                        <MDBTextArea onChange={(e) => { setDescr(e.target.value) }} label="Descrizione" id="descr" rows={4} />
                        <br />
                        <MDBInput onChange={(e) => { setDim(e.target.value) }} label="Dimensioni" id="dim" type="text" />
                        <br />
                        <MDBInput onChange={(e) => { setCodeq(e.target.value) }} label="Codici equivalenti" id="codeq" type="text" />
                        <br />
                        <MDBInput onChange={(e) => { setPrezzo(e.target.value) }} label="Prezzo" id="prezzo" type="text" />
                        <br />
                        <div id="visible-check">
                            <MDBCheckbox label="Nascondi" onChange={() => { setInvisibile(!invisibile) }} />
                        </div>
                        <br />
                        <div>
                            <MDBBtn id="add-button" outline color="success" disabled={loading} onClick={aggiungi}>{loading && <LoadingModel />}Aggiungi</MDBBtn>
                            <Modal crossFnc={chiudi} body="Articolo aggiunto con successo!" btn1Txt="Close" btn1Fnc={chiudi} btn2Txt="" btn2Fnc={()=>{}} modal={aggiuntoModal} setModal={setAggiuntoModal}/> {/**modal aggiunto */}
                            <Modal crossFnc={chiudi} body="Errore imprevisto! Articolo non aggiunto." btn1Txt="Close" btn1Fnc={chiudi} btn2Txt="" btn2Fnc={()=>{}} modal={erroreModal} setModal={setErroreModal}/> {/**modal errore */}

                            <MDBBtn id="add-button" outline color="danger" disabled={loading} onClick={elimina}>Cancella</MDBBtn>
                            <Modal crossFnc={chiudi} body="Sei sicuro di voler cancellare i dati inseriti?" btn1Txt="No" btn1Fnc={elimina} btn2Txt="Si" btn2Fnc={chiudi} modal={cancellaModal} setModal={setCancellaModal}/> {/**modal cancella */}
                            
                        </div>
                    </MDBCardBody>
                </MDBCard>
            }
        </>

    )
}