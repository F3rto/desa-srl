import React from 'react';
import { getDownloadURL, ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { useState, useEffect } from 'react';
import '../../App.css';
import Modal from "./Modal";

export default function EditImmagini(props) {

    const immagini = props.immagini;
    const setImmagini = props.setImm;
    let toDelList = props.toDel;
    const setToDelList = props.update;
    const [urls, setUrls] = useState([]);

    const [eliminaModal, setEliminaModal] = useState(false);
    const eliminaShow = () => { setEliminaModal(!eliminaModal) }
    const [id, setId] = useState(0);

    useEffect(() => {
        async function getUrls() {
            const urlPromises = immagini.map((i) => {
                const r = ref(storage, i);
                return getDownloadURL(r);
            });
            const urls = await Promise.all(urlPromises);
            setUrls(urls);
        }
        getUrls();
    }, [immagini])

    async function deleteImage() {
        try {
            const immRef = ref(storage, urls[id])
            toDelList.push(immRef)
            setToDelList(toDelList)
            console.log(toDelList)
            setImmagini(immagini.filter(i => i != immagini[id]))
        } catch (error) {
            console.log(error)
        }
        eliminaShow();
    }

    function prova(id) {
        setId(id);
        eliminaShow();
    }

    return (
        <>
            <span>Clicca un'immagine per eliminarla</span>
            <div className="p-1 d-flex flex-wrap gap-1 justify-content-center">
                {
                    urls.map((u, i) => {
                        return (
                            <img
                                key={i}
                                id={i}
                                className="w-25 img-fluid zoom"
                                onClick={
                                    (e) => { prova(e.target.id) }
                                }
                                src={u}
                                alt="..."
                            />

                        )
                    })
                }
                <Modal crossFnc={eliminaShow} body="Sei sicuro di voler eliminare l'immagine selezionata? Non sarà più possibile recuperarla." btn1Txt="No" btn1Fnc={eliminaShow} btn2Txt="Si" btn2Fnc={deleteImage} modal={eliminaModal} setModal={setEliminaModal} /> {/**modal elimina */}
            </div>
        </>

    );
}

