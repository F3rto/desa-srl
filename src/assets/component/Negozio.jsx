import React, { useEffect, useState } from "react"
import ListaArticoli from "./ListaArticoli"
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function Negozio() {

    const [articoli, setArticoli] = useState(["pippo"]);
    const articoloCollectionRef = collection(db, "articoli");

      useEffect(() => {
        const getArticoli = async () => {
            const data = await getDocs(articoloCollectionRef);
            setArticoli(data.docs.map((doc) => ({
                articolo: doc._document.data.value.mapValue.fields.a.mapValue.fields,
                id: doc.id
            })))

        }
        getArticoli();
    }, [])

    return (
        <div className="principale">
            <h1>Lista Articoli</h1>
            {articoli[0]!=="pippo" ? 
            <ListaArticoli key={uuidv4()} articoli={articoli}/>
             : <p>caricamento</p>}
        </div>
    )
}