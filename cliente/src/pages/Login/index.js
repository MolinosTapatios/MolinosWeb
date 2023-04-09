import React, { useEffect, useRef, useState } from "react";
import image from "img/1.0.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import './index.css'
import CrearCuenta from "pages/CrearCuenta";

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
            navigate(state ?? "/");
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
                                <CrearCuenta />
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
                                            <Link to="/tu mauser" className="row justify-content-center">
                                                ¿Olvidaste tu Contraseña?
                                            </Link>
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
