import { useState } from "react";
import { MDBCard, MDBFile, MDBCardBody, MDBCardTitle, MDBInput, MDBRow, MDBCol, MDBTextArea, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import '../../App.css'
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes, list } from "firebase/storage";
import { v4 } from "uuid";

export default function AddArticolo(props) {
    const show = props.show;
    const showAdd = props.set;

    const articoloCollectionRef = collection(db, "articoli");


    const [nome, setNome] = useState("---");
    const [cod, setCod] = useState("---");
    const [codeq, setCodeq] = useState("---");
    const [dim, setDim] = useState("---");
    const [descr, setDescr] = useState("---");
    const [prezzo, setPrezzo] = useState("---");
    const [imm,setImm] = useState([]);
    const [invisibile, setInvisibile] = useState(false);

    
    async function aggiungi() {
        /**
         * passo all'oggetto Articolo nel campo imm, un array di stringhe con path relativi alle immagini dell'articolo, otterrò le ref con il metodo ref()
         */
        let img=[];
        for(let i=0; i<imm.length;i++) {
            let string = 'images/'+imm[i].name+v4();
            const immRef = ref(storage, string);
            img.push(immRef.fullPath)
            //console.log(ref(storage, img[i]))
            await uploadBytes(immRef, imm[i]);
        }
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
        let result = await addDoc(articoloCollectionRef, { a });
        if (result !== null) {
            window.alert("Articolo aggiunto con successo!");
            showAdd(false);
            window.location.reload(false);
        } else {
            window.alert("ATTENZIONE!!! Errore nell'inserimento dell'articolo!");
        }
    }
    function elimina() {
        let risposta = window.confirm("Sei sicuro di voler cancellare i dati inseriti?");
        if(risposta === true) {
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
                <MDBCardTitle>Nuovo Articolo</MDBCardTitle>
                <MDBCardBody>
                    <MDBFile onChange={(e)=>{setImm(e.target.files)}} multiple accept="image/*" id='customFile' />
                    <br />
                    <MDBInput onChange={(e)=>{setNome(e.target.value)}} label="Nome Articolo" id="nome" type="text" />
                    <br />
                    <MDBInput onChange={(e)=>{setCod(e.target.value)}} label="Codice Articolo" id="cod" type="text" />
                    <br />
                    <MDBTextArea onChange={(e)=>{setDescr(e.target.value)}} label="Descrizione" id="descr" rows={4} />
                    <br />
                    <MDBInput onChange={(e)=>{setDim(e.target.value)}} label="Dimensioni" id="dim" type="text" />
                    <br />
                    <MDBInput onChange={(e)=>{setCodeq(e.target.value)}} label="Codici equivalenti" id="codeq" type="text" />
                    <br />
                    <MDBInput onChange={(e)=>{setPrezzo(e.target.value)}} label="Prezzo" id="prezzo" type="text" />
                    <br />
                    <div id="visible-check">
                        <MDBCheckbox label="Nascondi" onChange={()=>{setInvisibile(!invisibile)}}/>
                    </div>
                    <br />
                    <div>
                        <MDBBtn className="add-button" outline color="success" onClick={aggiungi}>Aggiungi</MDBBtn>
                        <MDBBtn className="add-button" outline color="danger" onClick={elimina}>Cancella</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>}
        </>

    )
}