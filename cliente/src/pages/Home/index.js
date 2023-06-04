import { useEffect, useState } from "react"
import CarruselCards from "componentes/CarruselCards"
import './index.css'
import { Producto } from "services/producto"
import { URL } from "services/config"

function Home() {

    const [productos, setProductos] = useState()

    useEffect(() => {
        const p = new Producto({ tipo: 1, status: 1 })
        p.getProductosHome(p, 10)
            .then(resp => {
                resp.map(obj =>{
                    obj.imagenes.map(i=>{
                        i.path = URL + '/' +i.path
                        return i
                    })
                    return obj
                })
                setProductos(resp)
            })
    }, [])

    return (
        <div style={{ minWidth: "300px" }}>
            <div >
                <div className="fondo-home" >
                    <div className='title-respons container text-center'>
                        <h1 className='row'>Maquinaria Cabrera</h1>
                        <h4 className='row'>Maquinaria adaptada a tu necesidad</h4>
                    </div>
                </div>
            </div>
            <div className='' id="domestico">
                <h2 className="text-center">MOLINOS DE DISCO USO DOMÉSTICO</h2>
                <CarruselCards data={productos} />
            </div>
        </div>
    );
}

export default Home