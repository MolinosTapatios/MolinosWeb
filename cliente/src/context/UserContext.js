import React, { useState, useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  
  const [jwt, setJWT] = useState()

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem("active");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setJWT(user.id);
    }
  }, [])

  return <Context.Provider value={{ jwt, setJWT }}>
    {children}
  </Context.Provider>
}

export default Context