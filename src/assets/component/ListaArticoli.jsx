import Articolo from "./Articolo"

export default function ListaArticoli(props) {
    const lista=props.articoli;
    return (
        <div>
            {
                lista.map((a) => {
                    if (!a.articolo.invisibile.booleanValue) {
                        return < Articolo key={a.id} articolo={a} />
                    }
                })
            }
        </div>
    )

}