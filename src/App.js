import React,{ useState, useEffect } from "react";
import {Route, Routes} from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Nav from "./componentes/Nav.jsx";
import RegProduct from './pages/RegistrarProduct.jsx'
import Productos from './pages/Productos.jsx'
import ErrorPage from "./pages/ErrorPage.jsx";


function App() {
  
  const [conectado, setConectado] = useState(false);
  
  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem("active");
    if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON);
        setConectado(user.flag);
    }
  }, []);

  const acceder=(estado)=>{
    setConectado(estado); 
  }
 const NAV = ()=> conectado ? <Nav/>:"";
 const Tortilla = ()=> <h1>Tortilladoras</h1>;

  return (
    conectado ?
      <div>
        <NAV/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/registrarPr" element={<RegProduct />}/>
          <Route path="/tortilla" element={<Tortilla />}/>
          <Route path="/todos_productos" element={<Productos />}/>
          <Route path="/:rest/*" element={<ErrorPage />}/>
        </Routes>
      </div> : <Login acceder={acceder}/>
    );
}

export default App;
