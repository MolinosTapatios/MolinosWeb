import React,{ useState } from "react";
import Login from "./componentes/Login";
// import Menu from "./componentes/Menu";
import Nav from "./componentes/Nav";

function App() {

  const [conectado, setConectado] = useState(false);

  const acceder=(estado)=>{
    setConectado(estado); 
  }

  return (
    conectado ? <Nav/> /*<Menu />*/ : <Login acceder={acceder}/>    
    );
}

export default App;
