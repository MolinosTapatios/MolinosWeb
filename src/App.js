import React, { useState, useEffect } from "react"
import { Route, Routes } from 'react-router-dom'
import "./App.css"

import Login from "pages/Login"
import Home from "pages/Home"
import RegProduct from 'pages/RegistrarProduct'
import Productos from 'pages/Products'
import ErrorPage from "pages/ErrorPage"
import Carrito from "pages/Carrito"

import Header from "./componentes/Header"

import { UserContextProvider } from 'context/UserContext'
import { ProductsContextProvider } from 'context/ProductsContext'
import LogoutTimer from "componentes/LogoutTimer"

function Contador({conectado}) {

  const [timer, setTimer] = useState(0)

  useEffect(()=>{

    if (conectado) {
      setTimeout(()=>{
        setTimer(timer + 1)
      }, 1000)
    }
      
  })
  
  return(
    <>
      <div className="contador">{timer}</div>
    </>
  )
}

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

  const Tortilla = () => <h1>Tortilladoras</h1>;

  return (
    <>
      <UserContextProvider>
        <Header acceder={acceder} />
        <LogoutTimer time={10 * 1000} />
        <Contador conectado={conectado} />
        <ProductsContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/:rest/*" element={<ErrorPage />} />
            <Route path="/tortilladoras" element={<Tortilla />} />
            {
              conectado ?
                <>
                  <Route path="/registrarPr" element={<RegProduct />} />
                  <Route path="/catalogo" element={<Productos />} />
                  <Route path="/carrito" element={<Carrito />} />
                </>
                : ""
            }
          </Routes>
        </ProductsContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
