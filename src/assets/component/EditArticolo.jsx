import { useState } from "react";
import { MDBCard, MDBFile, MDBCardBody, MDBCardTitle, MDBInput, MDBRow, MDBCol, MDBTextArea, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import '../../App.css'
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Slider } from "./Slider";

export default function EditArticolo(props) {
    const show = props.show;
    const showAdd = props.set;

    const articolo = props.articolo.articolo;
    const id = props.articolo.id;
    const flag = Object.entries(articolo.imm.arrayValue).length !==0

    const articoloCollectionRef = collection(db, "articoli");

    function getArrayImm() {
        if(!flag) return [];
        let arr=articolo.imm.arrayValue.values;
        let toRet=[];
        arr.map((i)=>{
            toRet.push(i.stringValue);
        })
        return toRet;
    }

    const [nome, setNome] = useState(articolo.nome.stringValue);
    const [cod, setCod] = useState(articolo.cod.stringValue);
    const [codeq, setCodeq] = useState(articolo.codeq.stringValue);
    const [dim, setDim] = useState(articolo.dim.stringValue);
    const [descr, setDescr] = useState(articolo.descr.stringValue);
    const [prezzo, setPrezzo] = useState(articolo.prezzo.stringValue);
    const [imm, setImm] = useState(getArrayImm());
    const [invisibile, setInvisibile] = useState(articolo.invisibile.booleanValue)
    console.log(invisibile)


    async function salva() {
        let a = {
            imm: imm,
            nome: nome,
            cod: cod,
            descr: descr,
            dim: dim,
            codeq: codeq,
            prezzo: prezzo,
            invisibile: invisibile
        }
        const articoloDoc = doc(db, "articoli", id);
        let delRes = await deleteDoc(articoloDoc);
        if (delRes !== null) {
            let result = await addDoc(articoloCollectionRef, { a });
            if (result !== null) {
                window.alert("Articolo aggiornato con successo!");
                showAdd(false);
                window.location.reload(false);
            }
        }
        else {
            window.alert("ATTENZIONE!!! Errore nella modifica dell'articolo!");
        }
    }
    function elimina() {
        let risposta = window.confirm("Sei sicuro di voler annullare le modifiche?");
        if (risposta === true) {
            showAdd(false);
        }
        /**
         * Usare dialog react al posto di window.confirm
         * link: https://mui.com/material-ui/react-dialog/
         */
    }


    return (
        <>
            {show && <MDBCard className='mb-3 w-75' shadow="5">
                <br />
                <MDBCardTitle>Modifica Articolo</MDBCardTitle>
                <MDBCardBody>
                    {flag?<Slider immagini={articolo.imm.arrayValue.values} />:<></>}
                    <br />
                    <MDBInput onChange={(e) => { setNome(e.target.value); e.ta }} label="Nome Articolo" id="nome" type="text" value={nome} />
                    <br />
                    <MDBInput onChange={(e) => { setCod(e.target.value) }} label="Codice Articolo" id="cod" type="text" value={cod} />
                    <br />
                    <MDBTextArea onChange={(e) => { setDescr(e.target.value) }} label="Descrizione" id="descr" rows={4} value={descr} />
                    <br />
                    <MDBInput onChange={(e) => { setDim(e.target.value) }} label="Dimensioni" id="dim" type="text" value={dim} />
                    <br />
                    <MDBInput onChange={(e) => { setCodeq(e.target.value) }} label="Codici equivalenti" id="codeq" type="text" value={codeq} />
                    <br />
                    <MDBInput onChange={(e) => { setPrezzo(e.target.value) }} label="Prezzo" id="prezzo" type="text" value={prezzo} />
                    <br />
                    <div id="visible-check">
                        <MDBCheckbox label="Nascondi" onChange={()=>{setInvisibile(!invisibile)}} checked={invisibile}/>
                    </div>
                    <br />
                    <div>
                        <MDBBtn id="add-button" outline color="success" onClick={salva}>Salva</MDBBtn>
                        <MDBBtn id="add-button" outline color="danger" onClick={elimina}>Annulla</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>}
        </>

    )
}