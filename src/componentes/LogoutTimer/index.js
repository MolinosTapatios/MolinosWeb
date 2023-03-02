// import useUser from "hooks/useUser";
import { useEffect, useState } from "react";

function LogoutTimer({ conectado }) {

  // const { logout } = useUser()
  const [reloj, setReloj] = useState(0)

  //solo es un temporizador
  useEffect(() => {
    if (conectado) {
      setTimeout(() => {
        setReloj(reloj + 1)
      }, 1000)
    }
  }, [reloj, conectado])

  return (
    <>
        {/* <div className="contador">{reloj}</div> */}
    </>
  )

}

export default LogoutTimer