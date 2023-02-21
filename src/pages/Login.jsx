import React, { useRef, useState } from "react";
import image from "../img/1.0.png";
import {URL} from "../services/config";
// import { Modal } from "react-bootstrap";
// const URL_LOGIN = "http://localhost/server/validar_user.php";

//              ---------------funciona----------
// const enviarData = async (url,data) => {
//     await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response => console.log('Success:', response));
//         console.log(data);
// }

// Ejemplo implementando el metodo POST:
const postData = async (data) => {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(`${URL}/validar_user.php`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*' 
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'origin-when-cross-origin' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    const json = await response.json();
    return json;
}


function Login(props) {

    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(null);

    const refUsuario = useRef(null);
    const refPassword = useRef(null);
    // const refForm = useRef(null);

    const handleLogin = async () => {
        setEspera(true);
        const data = {
            "user": refUsuario.current.value,
            "password": refPassword.current.value
        };
        try {
            const user = await postData(data);
            if (user.flag) {
                window.sessionStorage.setItem("active", JSON.stringify(user));
                window.history.pushState({},"","/");
            }
            props.acceder(user.flag);
            setError(user.msg);
        } catch (e) {
            setError("Error en el Servidor");
        }
        setEspera(false);
    }

    return (
        <div className="login">
            <form>
                <div className="modal d-block py-5" tabIndex="-1" role="dialog" id="modalSignin">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content rounded-4 shadow info">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <img className="imagenUser" src={image} alt="imagen de usuario" />
                            </div>

                            <div className="modal-body px-4 pt-0">
                                <div className="container-fluid">
                                    <div id="inputUsuario" className="form-floating mb-3">
                                        <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="username..." ref={refUsuario} />
                                        <label htmlFor="floatingInput">Usuario</label>
                                    </div>
                                    <div id="inputPassword" className="form-floating mb-3">
                                        <input name="password" type="password" className="form-control rounded-3" id="floatingPassword"
                                            placeholder="Password" ref={refPassword} />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                    {
                                        error &&
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    }
                                    <button id="button" className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={handleLogin} disabled={espera}>Iniciar Sesion</button>
                                    <a className="row justify-content-center" href="https://#">¿Olvidaste tu Contraseña?</a>
                                    <hr className="border border-dark border-2 opacity-50" />
                                    <div className="d-grid gap-2 col-8 mx-auto">
                                        <button className="mb-2 btn btn-lg rounded-3 btn-success">Crear Cuenta Nueva</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;