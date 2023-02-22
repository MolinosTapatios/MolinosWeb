import React, { useEffect, useRef, useState } from "react";
import image from "img/1.0.png";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
// import login from "services/login";

function Login({acceder}) {
    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(null);
    const { login, isLogged } = useUser();
    const navigate = useNavigate();

    const refUsuario = useRef(null);
    const refPassword = useRef(null);

    useEffect(
        () => {
            if (isLogged) navigate("/");
        },
        [isLogged, navigate]
    );

    const handleLogin = event => {
        event.preventDefault();
        event.stopPropagation();
        setEspera(true);
        try {
            login({
                username: refUsuario.current.value,
                password: refPassword.current.value
                // estado: acceder,
            });
            // login({ "user": refUsuario.current.value, "password": refPassword.current.value })
            //     .then(user => {
            //         if (user.flag) {
            //             window.sessionStorage.setItem("active", JSON.stringify(user));
            //         }
            //         console.log(user);
            //         props.acceder(user.flag);
            // props.acceder(true);
            //         setError(user.msg);
            //     })
        } catch (e) {
            setError("Error en el Servidor" + e);
        }
        setEspera(false);
    };

    return (
        <div className="login">
            <form>
                <div
                    className="modal d-block py-5"
                    tabIndex="-1"
                    role="dialog"
                    id="modalSignin"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content rounded-4 shadow info">
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <img
                                    className="imagenUser"
                                    src={image}
                                    alt="imagen de usuario"
                                />
                            </div>

                            <div className="modal-body px-4 pt-0">
                                <div className="container-fluid">
                                    <div id="inputUsuario" className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-3"
                                            id="floatingInput"
                                            placeholder="username..."
                                            ref={refUsuario}
                                        />
                                        <label htmlFor="floatingInput">Usuario</label>
                                    </div>
                                    <div id="inputPassword" className="form-floating mb-3">
                                        <input
                                            name="password"
                                            type="password"
                                            className="form-control rounded-3"
                                            id="floatingPassword"
                                            placeholder="Password"
                                            ref={refPassword}
                                        />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                    {error &&
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>}
                                    <button
                                        id="button"
                                        className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                        type="submit"
                                        onClick={handleLogin}
                                        disabled={espera}
                                    >
                                        Iniciar Sesion
                                    </button>
                                    <a className="row justify-content-center" href="https://#">
                                        ¿Olvidaste tu Contraseña?
                                    </a>
                                    <hr className="border border-dark border-2 opacity-50" />
                                    <div className="d-grid gap-2 col-8 mx-auto">
                                        <button className="mb-2 btn btn-lg rounded-3 btn-success">
                                            Crear Cuenta Nueva
                                        </button>
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
