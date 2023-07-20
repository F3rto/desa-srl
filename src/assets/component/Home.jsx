import React from "react"
import '../../App.css'
import Carosello from "./Carosello"
import NegozioReference from "./NegozioReference"
import CookieConsent from "react-cookie-consent";

export default function Home() {
    return (
        <div>
            <Carosello />
            <NegozioReference />
            <CookieConsent buttonText="Capisco">Questo sito utilizza cookies per migliorare l'esperienza di utilizzo.</CookieConsent>

        </div>
    )
}