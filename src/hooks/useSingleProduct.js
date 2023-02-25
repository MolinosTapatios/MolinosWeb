import { useState, useEffect, useCallback } from "react"
import getSingleProduct from 'services/getSingleProduct'

function useSingleProduct() {

    const { producto, setProducto } = useState(null)
    const [estado, setEstado] = useState({ loading: null, error: null })

    const getproduct = useCallback(({id})=>{
        if(!producto){
            setEstado({error:false, loading:true})
            getSingleProduct({id})
            .then(resp =>{
                setProducto(resp)
                setEstado({error:false, loading:false})
            }).catch(e => setEstado({error:e,loading:false}))
        }
    },[setProducto, producto])

    // const tipoProductos = useCallback(({ tipo, limit } = { tipo: 1, limit: 10 }) => {
    //     setEstado({ loading: true, error: null })
    //     getProducts()
    //         .then(resp => {
    //             if (tipo === -1 && limit === 0) {
    //                 setProductos(resp)
    //             } else {
    //                 const filtroTipo = resp.filter((r, i) => parseInt(r.Tipo_Producto_id) === tipo)
    //                 const filtrolimit = filtroTipo.filter((r, i) => i < parseInt(limit))
    //                 setProductos(filtrolimit)
    //                 console.log(filtroTipo)
    //             }
    //             setEstado({ loading: false, error: null })
    //         }).catch(error => setEstado({ loading: false, error: error }))
    // }, [setProductos])

    return {
        producto: producto,
        setProducto,
        getproduct,
        loading: estado.loading,
        error: estado.error
    }
}

export default useSingleProduct