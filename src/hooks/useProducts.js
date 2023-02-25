import { useContext, useState, useCallback } from "react"
import getProducts from "services/getProducts"
import Context from 'context/ProductsContext'

function useProducts() {

    const { productos, setProductos } = useContext(Context)
    const [estado, setEstado] = useState({ loading: null, error: null })

    const tipoProductos = useCallback(({ tipo, limit } = { tipo: 1, limit: 10 }) => {
        setEstado({ loading: true, error: null })
        getProducts()
            .then(resp => {
                if (tipo === -1 && limit === 0) {
                    setProductos(resp)
                } else {
                    const filtroTipo = resp.filter((r, i) => parseInt(r.Tipo_Producto_id) === tipo)
                    const filtrolimit = filtroTipo.filter((r, i) => i < parseInt(limit))
                    setProductos(filtrolimit)
                }
                setEstado({ loading: false, error: null })
            }).catch(error => setEstado({ loading: false, error: error }))
    }, [setProductos])

    return {
        productos: productos,
        tipoProductos,
        loading: estado.loading,
        error: estado.error
    }
}

export default useProducts