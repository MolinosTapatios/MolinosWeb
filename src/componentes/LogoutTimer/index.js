// import useUser from "hooks/useUser";
import { useEffect, /* useState */ } from "react";
// import { useNavigate } from "react-router-dom";

function LogoutTimer({ time }) {
  // const [timer, setTimer] = useState();
  // const { isLogged, logout } = useUser()
  // const navigate = useNavigate()

  useEffect(() => {

    // if(isLogged){
    //   setTimeout(()=>{
    //     console.log("sesion expirada");
    //     navigate("/login")
    //     logout()
    //   },5000)
    // }
  // eslint-disable-next-line
  },[]);


  // useEffect(() => {
  //   const resetTimer = () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //     setTimer(setTimeout(logout, time));
  //   };

  //   const logout = () => {
  //     // Limpiar los tokens de sesión o el estado de autenticación
  //     // y redirigir al usuario a la página de inicio de sesión.
  //   };

  //   resetTimer();

  //   // Reiniciar el temporizador cuando el usuario realiza alguna actividad.
    // document.addEventListener("mousemove", resetTimer);
  //   document.addEventListener("keydown", resetTimer);

  //   return () => {
  //     clearTimeout(timer);
  //     document.removeEventListener("mousemove", resetTimer);
      // document.removeEventListener("keydown", resetTimer);
  //   };
  // }, [timer, time]);


  return null;
}

export default LogoutTimer