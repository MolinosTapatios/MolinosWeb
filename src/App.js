import React,{ useState, useEffect } from "react";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Nav from "./componentes/Nav";


function App() {
  
  const [conectado, setConectado] = useState(false);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("active");
    if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON);
        setConectado(user.flag);
    }
  }, []);

  const acceder=(estado)=>{
    setConectado(estado); 
  }
  const login=<Login acceder={acceder}/>;
  return (
      conectado ? 
      <div>
        <Nav/>
        <Home/>
      </div> : login
    );
}

export default App;
