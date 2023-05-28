import React, { useState } from "react"
import Modificabile from "./Modificabile"

export default function ListaArticoli(props) {
    const lista=props.articoli;
    return (
        <div>
            {
                lista.map((a) => {
                    return < Modificabile key={a.id} articolo={a} fun={props.fun}/>
                })
            }
        </div>
    )

}