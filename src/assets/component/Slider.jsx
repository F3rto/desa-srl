import Carousel from 'react-bootstrap/Carousel';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { useState, useEffect } from 'react';
import '../../App.css'

export function Slider(props) {
    const immagini = props.immagini;
    const [urls, setUrls] = useState([]);
    const flag = immagini.length == 1 ? false : true;
    
    useEffect(() => {
        async function getUrls() {
            const urlPromises = immagini.map((i) => {
                const r = ref(storage, i.stringValue);
                return getDownloadURL(r);
            });
            const urls = await Promise.all(urlPromises);
            setUrls(urls);
        }
        getUrls();
    }, [immagini])

    return (
        <Carousel variant={"dark"} controls={flag}>
            {
                urls.map((u, i) => {
                    return <Carousel.Item id='foto' key={i}>
                        <img
                            className="d-block w-100 img-fluid"
                            src={u}
                            alt="..."
                        />
                    </Carousel.Item>
                })
            }
        </Carousel>
    );
}
