import React, { useEffect, useRef, useState } from "react";
import image from "img/1.0.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import './index.css'
import CrearCuenta from "./CrearCuenta";

function Login() {
    const { login, isLogged, loading, error } = useUser();
    const navigate = useNavigate();
    const { state } = useLocation()
    const [newCuenta, setNewCuenta] = useState(false)

    const handleCuneta = () => setNewCuenta(!newCuenta)

    const refUsuario = useRef(null);
    const refPassword = useRef(null);

    useEffect(() => {
        if (isLogged) {
            navigate(state.href ?? "/");
        }
        // eslint-disable-next-line
    }, [isLogged])

    const handleLogin = event => {
        event.preventDefault();
        event.stopPropagation();
        login({
            username: refUsuario.current.value,
            password: refPassword.current.value
        })
    };

    const handleClick = () => {
        handleCuneta()
    }
    return (
        <div className="login">
            <div
                className="modal d-block py-5"
                tabIndex="-1"
                role="dialog"
                id="modalSignin"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow info">
                        {
                            newCuenta
                                &&
                                <div className="icon-back">
                                    <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                    </svg>
                                </div>
                        }
                        <div className="modal-header pb-4 border-bottom-0">
                            <img
                                className="imagenUser"
                                src={image}
                                alt="imagen de usuario"
                            />
                        </div>
                        {
                            newCuenta
                                ?
                                <CrearCuenta login={handleCuneta} />
                                :
                                <div className="modal-body px-4 pt-0">
                                    <div className="container-fluid">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    placeholder="username..."
                                                    ref={refUsuario}
                                                />
                                                <label>Usuario</label>
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
                                                </div>
                                            }
                                            <button
                                                id="button"
                                                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                                type="submit"
                                                onClick={handleLogin}
                                                disabled={loading}
                                            >
                                                Iniciar sesión
                                            </button>
                                            {/* <Link to="/" className="row justify-content-center">
                                                ¿Olvidaste tu Contraseña?
                                            </Link> */}
                                            <hr className="border border-dark border-2 opacity-50" />
                                        </form>
                                        <div className="d-grid gap-2 col-8 mx-auto">
                                            <button onClick={handleCuneta} className="mb-2 btn btn-lg rounded-3 btn-success">
                                                Crear cuenta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
