import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "pages/Login";
import Home from "pages/Home";
import RegProduct from 'pages/RegistrarProduct'
import Productos from 'pages/Products'
import ErrorPage from "pages/ErrorPage";
import Header from "./componentes/Header";
import { UserContextProvider } from 'context/UserContext'

function App() {

  const [conectado, setConectado] = useState(false);
  
  useEffect(() => {
    console.log(conectado)
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
        <Routes>
          <Route path="/login" element={<Login acceder={acceder} />} />
          <Route path="/" element={<Home />} />
          <Route path="/:rest/*" element={<ErrorPage />} />
          {
            conectado
              ? <>
                <Route path="/registrarPr" element={<RegProduct />} />
                <Route path="/tortilla" element={<Tortilla />} />
                <Route path="/todos_productos" element={<Productos />} />
              </>
              : ""
          }
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
