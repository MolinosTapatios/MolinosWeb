import React,{ useState, useEffect } from "react";
import {Route, Routes} from 'react-router-dom'
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Nav from "./componentes/Nav";
import RegProduct from './subPaginas/RegistrarProduct'


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
//  const RegPro = ()=> <h1>Registrar producto</h1>;

  return (
    conectado ?
      <div>
        <NAV/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/login" element={<Login acceder={acceder}/>}/> */}
          <Route path="/registrarPr" element={<RegProduct />}/>
          <Route path="/tortilla" element={<Tortilla />}/>
        </Routes>
      </div> : <Login acceder={acceder}/>
    );
}

export default App;
