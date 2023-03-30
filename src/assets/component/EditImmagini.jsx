import React from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { useState, useEffect } from 'react';
import '../../App.css'


export default function EditImmagini(props) {

    const immagini = props.immagini;
    const setImmagini = props.setImm;
    const [urls, setUrls] = useState([]);

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

    return (
        <div className="p-1 d-flex flex-wrap gap-1 justify-content-center">
            {
                urls.map((u, i) => {
                    return (
                        <img
                            key={i}
                            className="w-25 img-fluid"
                            /**
                             * TODO: metodo onClick che elimina l'immagine selezionata da urls e resetta quelle da tenere con setImmagini
                             */
                            src={u}
                            alt="..."
                        />

                    )
                })
            }
        </div>
    );
}

