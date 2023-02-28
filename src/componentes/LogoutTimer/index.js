import { useEffect, useState } from "react";

function LogoutTimer({conectado}) {

   /* const [loggedIn, setLoggedIn] = useState(conectado);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime")

    if(expireTime < Date.now()){
      console.log("Log out")
    }
  }

  const updateExpireTime = () => {
    const expireTime = Date.now() + 10000

    localStorage.setItem("expireTime", expireTime)
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      checkForInactivity()
    }, 5000);

    return () => clearInterval(interval)
  },[])

  useEffect(()=>{
    updateExpireTime()

    window.addEventListener("mousemove",updateExpireTime)

    return()=>{
      window.removeEventListener("mousemove",updateExpireTime)
    }
  },[]) */

  const [timer, setTimer] = useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      setTimer(timer+1)
    },1000)
  },[timer])
  
  return(
    <>
      <div className="contador">{timer}</div>
    </>
  )

}

export default LogoutTimer