import React, { useState, useEffect } from 'react'
import { useHref, useNavigate } from 'react-router-dom'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  
  const [jwt, setJWT] = useState({jwt:null,tipo:null})
  const href = useHref()
  const navigate = useNavigate()

  useEffect(()=>{
    if(href === '/catalogo' && jwt.jwt === null){
      navigate('/login', {
        state: {
          href: href
        }
      })
    }
  },[href])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem("active");
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