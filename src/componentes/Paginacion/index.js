import Tabla from "componentes/Tabla";
import React from "react";

function Paginacion({headers, data, ediar, eliminar}) {
    return(
        <>
            <Tabla headers={headers} lista={data} editar={ediar} eliminar={eliminar} />
        </>
    )
}

export default Paginacion