import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon} from "mdb-react-ui-kit";
import '../../App.css'
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { useState } from "react";
import EditArticolo from "./EditArticolo";
import { Slider } from "./Slider";
import { deleteObject, ref } from "firebase/storage";
import Modal from "./Modal";

export default function Modificabile(props) {
    /**
     * props.articolo è un oggetto del tipo
     * {
     *  id: "id dato dal DB"
     *  articolo: {nome:"nome", cod:"123"...}
     * }
     */
    const a = props.articolo.articolo;
    const flag = Object.entries(a.imm.arrayValue).length !== 0
    const key = props.articolo.id
    const [editMode, setEditMode] = useState(false);

    const [eliminaModal, setEliminaModal] = useState(false);
    const eliminaShow = () => { setEliminaModal(!eliminaModal) }

    const [successoModal, setSuccessoModal] = useState(false);
    const successoShow = () => { setSuccessoModal(!successoModal) }

    const [erroreModal, setErroreModal] = useState(false);
    const erroreShow = () => {setErroreModal(!erroreModal)}

    function modifica() {
        setEditMode(true);
    }

    async function eliminaImmagini() {
        let arr = a.imm.arrayValue.values;
        let ret = true;
        if (arr == undefined) return ret;
        try {
            for (let i = 0; i < arr.length; i++) {
                let string = arr[i].stringValue;
                const immRef = ref(storage, string)
                await deleteObject(immRef);
            }
        } catch (error) {
            ret = false;
            erroreShow();
        } finally {
            return ret;
        }
    }

    async function elimina() {
        eliminaShow();
        const articoloDoc = doc(db, "articoli", key);
        try {
            let ret = await eliminaImmagini();
            if (ret) {
                await deleteDoc(articoloDoc);
                successoShow();
                props.fun();
                //window.location.reload(false);
            }
        } catch (error) {
            erroreShow();
        }

    }

    return (
        <div className="articolo">
            {
                !editMode ?
                    <MDBCard alignment="start" className='mb-3 w-75' shadow="5">
                        {flag ? <Slider immagini={a.imm.arrayValue.values} /> : <></>}
                        <MDBCardBody >
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

                            <div>
                                <MDBBtn outline color='dark' id="edit" onClick={modifica}>
                                    <MDBIcon far icon="edit" /> Modifica
                                </MDBBtn>

                                <MDBBtn outline color='danger' id="delete" onClick={eliminaShow}>
                                    <MDBIcon far icon="trash-alt" /> Elimina
                                </MDBBtn>
                                <Modal crossFnc={eliminaShow} body="Sei sicuro di voler eliminare l'articolo?" btn1Txt="No" btn1Fnc={eliminaShow} btn2Txt="Si" btn2Fnc={elimina} modal={eliminaModal} setModal={setEliminaModal}/> {/**modal elimina */}
                                <Modal crossFnc={successoShow} body="Articolo eliminato con successo!" btn1Txt="Close" btn1Fnc={successoShow} btn2Txt="" btn2Fnc={()=>{}} modal={successoModal} setModal={setSuccessoModal}/> {/**modal successo */}
                                <Modal crossFnc={erroreShow} body="ATTENZIONE!!! Errore nell'eliminazione dell'articolo!" btn1Txt="Close" btn1Fnc={erroreShow} btn2Txt="" btn2Fnc={()=>{}} modal={erroreModal} setModal={setErroreModal}/> {/**modal errore */}
                                
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    :
                    <EditArticolo show={editMode} set={setEditMode} articolo={props.articolo} fun={props.fun}/>
            }
        </div>
    )

}