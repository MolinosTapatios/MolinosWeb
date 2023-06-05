import React, { useState, /* useEffect */ } from "react"
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from "pages/Login"
import Home from "pages/Home"
import RegProduct from 'pages/RegistrarProduct'
import Catalogo from 'pages/Catalogo'
import ErrorPage from "pages/ErrorPage"
import Carrito from "pages/Carrito"
import Tortilladoras from "pages/Tortilladoras"
import SingleProducto from "pages/SingleProducto"
import MiCuenta from "pages/MiCuenta"
import Almacen from "pages/Almacen"

import { ProductsContextProvider } from 'context/ProductsContext'
import useUser from "hooks/useUser"
import Header from "./componentes/Header"
import LogoutTimer from "componentes/LogoutTimer"

import './App.css'
// import Chat from "componentes/Chat"

function App() {

  const [conectado, setConectado] = useState(false);
  const { isLogged, user } = useUser()

  // useEffect(() => {
  //   const loggedUserJSON = window.sessionStorage.getItem("active");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setConectado(user.flag);
  //   }
  // }, [conectado]);

  const acceder = (estado) => {
    setConectado(estado)
  }

  return (
    <>
      <Header acceder={acceder} />
      <LogoutTimer time={10 * 1000} conectado={conectado} />
      <ProductsContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/tortilladoras" element={<Tortilladoras />} />
          <Route path="/detalles/:name" element={<SingleProducto />} />
          {
            isLogged &&
            <>
              {
                (parseInt(user.tipo) === 1 || parseInt(user.tipo) === 3) &&
                <>
                  <Route path="/registrarPr" element={<RegProduct />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/almacen" element={<Almacen />} />
                </>
              }
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/profile" element={<MiCuenta />} />
            </>
          }
          <Route path="/:rest/*" element={<Navigate to={'/404'} />} />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
      </ProductsContextProvider>
      {/* <Chat /> */}
    </>
  );
}

export default App;
