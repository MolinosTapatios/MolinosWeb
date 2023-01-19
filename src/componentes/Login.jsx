import React, { useRef } from "react"
const URL_LOGIN = "http://localhost/php/validar_user.php";

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
const postData = async (url, data) => {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({ user: "root" }), // body data type must match "Content-Type" header
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
    console.log(json);
}

export default function Login(props) {

    const refUsuario = useRef(null);
    const refPassword = useRef(null);
    const refForm = useRef(null);

    const handleLogin = () => {
        const data = {
            "user": refUsuario.current.value,
            "password" : refPassword.current.value 
        };
        // enviarData(URL_LOGIN,data);
        postData(URL_LOGIN, data);
        console.log(data);
    }

    return (
        <div className="login">
            <div className="row">
                <div className="col-sm-4 offset-4  mt-5">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h3>🔫Inicio</h3>
                        </div>
                        <form ref={refForm}>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">📧</span>
                                    <input type="email" className="form-control" placeholder="Correo" aria-label="Username" aria-describedby="basic-addon2" name="user" ref={refUsuario} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">🔐</span>
                                    <input type="password" className="form-control" placeholder="Contraseña" aria-label="password" aria-describedby="basic-addon2" name="password" ref={refPassword} />
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-info btn-lg" type="button" onClick={handleLogin}>Acceder</button>
                                </div>
                                <div className="card-footer">
                                    <span>¿Olvido su contrseña?</span><a href="http://localhost/Molinos%20Web/php/validar_user.php">Recuperar</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}