import React, { useEffect, useReducer, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import '../../App.css'
import { auth, db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth"
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit"
import AddArticolo from "./AddArticolo"
import ListaModificabili from "./ListaModificabili"
import { v4 as uuidv4 } from "uuid"
import Placeholder from "./Placeholder";


export default function AreaRiservata() {

    const [user, loading] = useAuthState(auth);

    const [showAdd, setShowAdd] = useState(false);
    const navigate = useNavigate();

    const [articoli, setArticoli] = useState(["pippo"]);
    const articoloCollectionRef = collection(db, "articoli");

    const [ignored, forceUpdate] = useReducer(x=>x+1, 0);

    useEffect(() => {
        const getArticoli = async () => {
            try {
                const data = await getDocs(articoloCollectionRef);
                setArticoli(data.docs.map((doc) => ({
                    articolo: doc._document.data.value.mapValue.fields.a.mapValue.fields,
                    id: doc.id
                })))
            } catch (error) {
                console.log(error)
            }
        }
        getArticoli();
    }, [ignored])

    useEffect(() => {
        if (!user) {
            return navigate("/private");
        }
    }, [user, loading])

    async function logout() {
        try {
            await signOut(auth);
            return navigate("/");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="principale">
            {
                <div>
                    <div className="d-flex justify-content-end" id="logout-button">
                        <MDBBtn color='dark' className="mb-4" onClick={logout}>
                            <MDBIcon className='me-2' fas icon='sign-out-alt' /> LogOut
                        </MDBBtn>
                    </div>
                    <h1>Benvenuto nell'area riservata</h1>
                    <MDBBtn onClick={() => {
                        setShowAdd(!showAdd);
                    }} >
                        <MDBIcon className="me-2" fas icon="plus" /> Aggiungi nuovo articolo
                    </MDBBtn>
                    <div className="articolo"><AddArticolo show={showAdd} set={setShowAdd} fun={forceUpdate} /></div>
                    <br />
                    <br />
                    {
                        articoli[0] !== "pippo" ?
                            <ListaModificabili key={uuidv4()} articoli={articoli} fun={forceUpdate}/>
                            :
                            <Placeholder />
                    }
                </div>
            }


        </div>
    )
}