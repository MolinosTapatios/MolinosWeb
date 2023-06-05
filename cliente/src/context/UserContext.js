import React, { useState, useEffect } from 'react'
import { useHref, useNavigate } from 'react-router-dom'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  
  const [jwt, setJWT] = useState({jwt:null,tipo:null})
  const href = useHref().toLowerCase()
  const navigate = useNavigate()

  useEffect(()=>{
    if((href === '/catalogo'.toLowerCase() || href === '/registrarPr'.toLowerCase() || href === '/almacen'.toLowerCase) && jwt.jwt === null){
      if(jwt.jwt){
        navigate(href)
      }else{
        navigate('/login', {
          state: {
            href: href
          } 
        })
      }
    }
  },[href,jwt.jwt, navigate])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("active");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setJWT({jwt:user.token,tipo:user.tipo});
    }
  }, [])

  return <Context.Provider value={{ jwt, setJWT }}>
    {children}
  </Context.Provider>
}

export default Context