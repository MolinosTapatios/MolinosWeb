import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Usuario from "services/usuario";
import './index.css'

function CrearCuenta() {

    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [estado, setEstado] = useState({ error: null, loading: false })

    const refApaterno = useRef();
    const refAmaterno = useRef();
    const refNombre = useRef();
    const refFechaNac = useRef();
    const refMail = useRef();
    const refUsername = useRef();
    const refPassword = useRef();
    const refConfirmar = useRef();

    const handleForm = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            setEstado({ loading: true })
            if (refPassword.current.value === refConfirmar.current.value) {
                const u = new Usuario({
                    username: refUsername.current.value,
                    amaterno: refAmaterno.current.value,
                    apaterno: refApaterno.current.value,
                    fechaNac: refFechaNac.current.value,
                    mail: refMail.current.value,
                    nombre: refNombre.current.value,
                    password: refPassword.current.value
                })
                u.crearUsuario(u)
                    .then(resp => {
                        if (resp.flag) {
                            alert("Cuenta Creada exitosamente")
                            navigate("/login")
                            setEstado({ loading: false })
                        } else {
                            setEstado({ loading: false, error: resp.msg })
                        }
                    })
                    .catch(e => setEstado({ loading: false, error: e }))
            } else {
                setEstado({ error: "Las contraseñas no coinciden", loading: false })
            }
        }
        setValidated(true);
    };

    return (
        <>
            <Form validated={validated} onSubmit={handleForm} className="crear-cuenta" >
                <div className="modal-body px-4 pt-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    placeholder="Apellido paterno"
                                    ref={refApaterno}
                                    required
                                />
                                <label>Apellido paterno</label>
                            </div>
                            <div className="col form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    placeholder="Apellido materno"
                                    ref={refAmaterno}
                                    required
                                />
                                <label>Apellido materno</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    placeholder="Nombre..."
                                    ref={refNombre}
                                    required
                                />
                                <label>Nombre</label>
                            </div>
                            <div className="col form-floating mb-3">
                                <input
                                    type="date"
                                    className="form-control rounded-3"
                                    ref={refFechaNac}
                                    required
                                />
                                <label>Fecha de Nacimiento</label>
                            </div>
                        </div>
                        <div className="col form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                placeholder="Correo"
                                ref={refMail}
                                required
                            />
                            <label>Correo</label>
                        </div>
                        <div className="col form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-3"
                                placeholder="Username"
                                ref={refUsername}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="row">
                            <div className="col form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    placeholder="Contraseña"
                                    ref={refPassword}
                                    required
                                />
                                <label>Contraseña</label>
                            </div>
                            <div className="col form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    placeholder="Contraseña"
                                    ref={refConfirmar}
                                    required
                                />
                                <label>Confirmar Contraseña</label>
                            </div>
                        </div>
                        {estado.error &&
                            <div className="alert alert-danger">
                                {estado.error}
                            </div>}
                        <button
                            id="button"
                            className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                            type="submit"
                            disabled={estado.loading}
                        >
                            Crear cuenta
                        </button>
                        <hr className="border border-dark border-2 opacity-50" />
                        <div className="d-grid gap-2 col-8 mx-auto">
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default CrearCuenta