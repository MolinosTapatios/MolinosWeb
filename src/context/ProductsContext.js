import React, { useState } from 'react'

const Context = React.createContext({})

export function ProductsContextProvider({ children }) {
    
    const [productos, setProductos] = useState([])

    return <Context.Provider value={{ productos, setProductos }}>
        {children}
    </Context.Provider>
}

export default Context