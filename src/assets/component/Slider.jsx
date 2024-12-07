import Carousel from 'react-bootstrap/Carousel';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../../firebase";
import { useState, useEffect } from 'react';
import '../../App.css';

export function Slider(props) {
    const immagini = props.immagini;
    const [urls, setUrls] = useState([]);
    const [normalizedImages, setNormalizedImages] = useState([]); // Aggiungi stato per le immagini normalizzate

    // Funzione helper per normalizzare le immagini
    const normalizeImages = (images) => {
        if (Array.isArray(images)) {
            return images.filter((i) => i); // Se è un array, filtra i valori vuoti o falsy
        }
        if (images && typeof images === 'object' && 'values' in images) {
            // Se è un oggetto con `values`, restituisci l'array dentro `values`
            return images.values.filter((i) => i); // Filtra i valori vuoti
        }
        return []; // Se non è né array né oggetto con `values`, restituisci un array vuoto
    };

    // Funzione helper per gestire i valori con `stringValue`
    const getCodValue = (codField) => {
        return codField?.stringValue || codField; // Usa `stringValue` se esiste, altrimenti il valore originale
    };

    // Normalizza le immagini solo quando `immagini` cambia
    useEffect(() => {
        const normalized = normalizeImages(immagini);
        setNormalizedImages(normalized);
    }, [immagini]); // Dipendenza su `immagini`

    const flag = normalizedImages.length > 1 && normalizedImages.some((img) => img); // Mostra controlli solo se ci sono più immagini valide

    useEffect(() => {
        // Esegui il recupero delle immagini solo se `normalizedImages` è cambiato
        async function getUrls() {
            console.log(immagini); // Controlla se c'è un cambiamento
            console.log(normalizedImages); // Vedi i dati normalizzati
            if (normalizedImages.length > 0) {
                try {
                    const urlPromises = normalizedImages
                        .filter((i) => i) // Filtra valori vuoti
                        .map((i) => {
                            const r = ref(storage, getCodValue(i)); // Normalizza ogni immagine
                            return getDownloadURL(r);
                        });
                    const urls = await Promise.all(urlPromises); // Ottieni tutte le URL
                    setUrls(urls);
                } catch (error) {
                    console.error("Errore nel recupero delle immagini:", error);
                }
            }
        }
        getUrls();
    }, [normalizedImages]); // Esegui il recupero URL solo quando `normalizedImages` cambia

    return (
        <Carousel variant={"dark"} controls={flag}>
            {urls.map((u, i) => (
                <Carousel.Item id='foto' key={i}>
                    <img
                        className="d-block w-100 img-fluid"
                        src={u}
                        alt={`Immagine ${i + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
