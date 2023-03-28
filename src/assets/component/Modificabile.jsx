import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon } from "mdb-react-ui-kit";
import '../../App.css'
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { useState } from "react";
import EditArticolo from "./EditArticolo";
import { Slider } from "./Slider";
import { deleteObject, ref } from "firebase/storage";

export default function Modificabile(props) {
    /**
     * props.articolo è un oggetto del tipo
     * {
     *  id: "id dato dal DB"
     *  articolo: {nome:"nome", cod:"123"...}
     * }
     */
    const a = props.articolo.articolo;
    const flag = Object.entries(a.imm.arrayValue).length !==0
    const key = props.articolo.id
    const [editMode, setEditMode] = useState(false);

    function modifica() {
        setEditMode(true);
    }

    async function eliminaImmagini() {
        let arr = a.imm.arrayValue.values;
        for(let i=0; i<arr.length;i++) {
            let string = arr[i].stringValue;
            const immRef = ref(storage, string)
            await deleteObject(immRef);
        }
    }

    async function elimina() {
        let temp = window.confirm("Sei sicuro di voler eliminare l'articolo?");
        if (temp) {
            const articoloDoc = doc(db, "articoli", key);
            eliminaImmagini();
            await deleteDoc(articoloDoc);
            window.location.reload(false);
        }
        /**
         * Usare dialog react al posto di window.confirm
         * link: https://mui.com/material-ui/react-dialog/
         * 
         * Quindi eliminare l'articolo dal db
         */
    }

    return (
        <div className="articolo">
            {
                !editMode ?
                    <MDBCard alignment="start" className='mb-3 w-75' shadow="5">
                        {flag?<Slider immagini={a.imm.arrayValue.values}/>:<></>}
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

                                <MDBBtn outline color='danger' id="delete" onClick={elimina}>
                                    <MDBIcon far icon="trash-alt" /> Elimina
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    :
                    /**
                     * usare un EditArticolo al posto di AddArticolo per troppe incongruenze tra l'aggiunta e la modifica
                     */
                    <EditArticolo show={editMode} set={setEditMode} articolo={props.articolo}/>
            }
        </div>
    )

}