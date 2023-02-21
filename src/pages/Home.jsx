// import  VistaProductos  from "../../componentes/VistaProductos";

function Home(params) {

    return (
        <div style={{minWidth:"300px"}}>
            <div >
                <div className="fondo-home" >
                    <div className='container text-center'>
                        <div className='title-respons'>
                            <div className='col-md-auto'>
                                <h1 className='m-2'>Maquinaria Cabrera</h1>
                                <h4 className='m-2'>Maquinaria adaptada a tu necesidad</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='' id="domestico">
                <h2 className="text-center">MOLINOS DE DISCO USO DOMÉSTICO</h2>
                {/* <VistaProductos /> */}
            </div>
        </div>
    );
}

export default Home;