import { useEffect } from "react";
import CarruselCards from "componentes/CarruselCards";
import './index.css'
import useProducts from "hooks/useProducts";

function Home() {

    const { productos, tipoProductos } = useProducts()

    useEffect(() => {
        tipoProductos({ limit: 10, tipo: 1 })
    }, [tipoProductos])

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

export default Home;