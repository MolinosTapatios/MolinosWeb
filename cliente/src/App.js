import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom'
import "./App.css"

import Login from "pages/Login"
import Home from "pages/Home"
import RegProduct from 'pages/RegistrarProduct'
import Catalogo from 'pages/Catalogo'
import ErrorPage from "pages/ErrorPage"
import Carrito from "pages/Carrito"
import Tortilladoras from "pages/Tortilladoras"

import Header from "./componentes/Header"

import { UserContextProvider } from 'context/UserContext'
import { ProductsContextProvider } from 'context/ProductsContext'
import LogoutTimer from "componentes/LogoutTimer"
import SingleProducto from "pages/SingleProducto"

function App() {

  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem("active");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setConectado(user.flag);
    }
  }, [conectado]);

  const acceder = (estado) => {
    setConectado(estado)
  }

  function Redirection () {
    const navigate = useNavigate()
    useEffect(()=>{
      navigate("/404")
    })
  }

  return (
    <>
      <UserContextProvider>
        <Header acceder={acceder} />
        <LogoutTimer time={10 * 1000} conectado={conectado} />
        <ProductsContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/:rest/*" element={<Redirection />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/tortilladoras" element={<Tortilladoras />} />
            <Route path="/detalles/:name" element={<SingleProducto />}/>
            {
              conectado &&
                <>
                  <Route path="/registrarPr" element={<RegProduct />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/carrito" element={<Carrito />} />
                </>
            }
          </Routes>
        </ProductsContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
