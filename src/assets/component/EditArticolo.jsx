import { useState } from "react";
import { MDBCard, MDBFile, MDBCardBody, MDBCardTitle, MDBInput, MDBRow, MDBCol, MDBTextArea, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import '../../App.css'
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from "../../../firebase";
import EditImmagini from "./EditImmagini";
import { v4 } from "uuid";
import Modal from "./Modal";

export default function EditArticolo(props) {
    const show = props.show;
    const showAdd = props.set;

    const articolo = props.articolo.articolo;
    const id = props.articolo.id;
    const flag = Object.entries(articolo.imm.arrayValue).length !== 0

    const articoloCollectionRef = collection(db, "articoli");

    function getArrayImm() {
        if (!flag) return [];
        let arr = articolo.imm.arrayValue.values;
        let toRet = [];
        arr.map((i) => {
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
    const [invisibile, setInvisibile] = useState(articolo.invisibile.booleanValue);
    const [toDelList, setToDelList] = useState([]);
    const [toUpList, setToUpList] = useState([]);
    const [images, setImages] = useState([]);

    const [cancellaModal, setCancellaModal] = useState(false);
    const cancellaShow = () => { setCancellaModal(!cancellaModal) }

    const [successoModal, setSuccessoModal] = useState(false);
    const successoShow = () => { setSuccessoModal(!successoModal) }

    const [erroreModal, setErroreModal] = useState(false);
    const erroreShow = () => {setErroreModal(!erroreModal)}

    async function salva() {
        const articoloDoc = doc(db, "articoli", id);
        try {
            await deleteDoc(articoloDoc);
            let a = { imm: imm, nome: nome, cod: cod, descr: descr, dim: dim, codeq: codeq, prezzo: prezzo, invisibile: invisibile };
            toDelList.forEach(async (t) => { await deleteObject(t); })
            toUpList.forEach(async (t, i) => {
                await uploadBytes(t, images[i]);
            })
            await addDoc(articoloCollectionRef, { a });
            console.log("successo")
            successoShow();
            props.fun();
            //window.location.reload(false);
        } catch (error) {
            console.log("errore")
            erroreShow();
        }
    }

    function elimina() {
        showAdd(false);
    }

    function addImm(imgs) {
        let temp = imm;
        let toUp = [];
        for (let i = 0; i < imgs.length; i++) {
            let string = 'images/' + imgs[i].name + v4();
            const immRef = ref(storage, string);
            toUp.push(immRef);
            temp.push(string)
        }
        setImm(temp);
        setImages(imgs);
        setToUpList(toUp);
    }
    
    function notShowAdd() {
        showAdd(false);
    }

    return (
        <>
            {show && <MDBCard className='mb-3 w-75' shadow="5">
                <br />
                <MDBCardTitle>Modifica Articolo</MDBCardTitle>
                <MDBCardBody>
                    {flag ? <EditImmagini immagini={imm} setImm={setImm} update={setToDelList} toDel={toDelList} /> : <></>}
                    <br />
                    <MDBFile onChange={(e) => { addImm(e.target.files) }} multiple accept="image/*" id='customFile' />
                    <br />
                    <MDBInput onChange={(e) => { setNome(e.target.value); }} label="Nome Articolo" id="nome" type="text" value={nome} />
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
                        <MDBCheckbox label="Nascondi" onChange={() => { setInvisibile(!invisibile) }} checked={invisibile} />
                    </div>
                    <br />
                    <div>
                        <MDBBtn id="add-button" outline color="success" onClick={salva}>Salva</MDBBtn>
                        <MDBBtn id="add-button" outline color="danger" onClick={cancellaShow}>Annulla</MDBBtn>
                    </div>
                    <Modal crossFnc={cancellaShow} body="Sei sicuro di voler annullare le modifiche?" btn1Txt="No" btn1Fnc={cancellaShow} btn2Txt="Si" btn2Fnc={elimina} modal={cancellaModal} setModal={setCancellaModal} /> {/**modal cancella */}
                    <Modal crossFnc={notShowAdd} body="Articolo modificato con successo!" btn1Txt="Close" btn1Fnc={notShowAdd} btn2Txt="" btn2Fnc={()=>{}} modal={successoModal} setModal={setSuccessoModal}/> {/**modal successo */}
                    <Modal crossFnc={notShowAdd} body="ATTENZIONE!!! Errore nella modifica dell'articolo!" btn1Txt="Close" btn1Fnc={notShowAdd} btn2Txt="" btn2Fnc={()=>{}} modal={erroreModal} setModal={setErroreModal}/> {/**modal errore */}
                </MDBCardBody>
            </MDBCard>}
        </>

    )
}