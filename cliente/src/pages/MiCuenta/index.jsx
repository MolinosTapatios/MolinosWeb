import useUser from "hooks/useUser";
import React, { useEffect, useRef } from "react";
import Usuario from "services/usuario";
import './index.css'
function MiCuenta() {

    const { user } = useUser()
    const refAmaterno = useRef()
    const refApaterno = useRef()
    const refFechaNac = useRef()
    const refMail = useRef()
    const refNombre = useRef()
    const refUsername = useRef()

    useEffect(() => {
        const u = new Usuario({ id: user.id })
        u.getUsuario(u)
            .then(resp => {
                refAmaterno.current.value = resp.amaterno
                refApaterno.current.value = resp.apaterno
                refFechaNac.current.value = resp.fechaNac
                refMail.current.value = resp.mail
                refNombre.current.value = resp.nombre
                refUsername.current.value = resp.username
            })
    })


    return (
        <>
            <div className="profile">
                <h2 className="title">Mis datos</h2>
                <div className="datos">
                    <div className="modal-body px-4 pt-0">
                        <div className="container-fluid">
                            <div className="col form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    placeholder="Username"
                                    ref={refUsername}
                                    required
                                    disabled
                                />
                                <label>Username</label>
                            </div>
                            <div className="row">
                                <div className="col form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="Apellido paterno"
                                        ref={refApaterno}
                                        required
                                        disabled
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
                                        disabled
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
                                        disabled
                                    />
                                    <label>Nombre</label>
                                </div>
                                <div className="col form-floating mb-3">
                                    <input
                                        type="date"
                                        className="form-control rounded-3"
                                        ref={refFechaNac}
                                        required
                                        disabled
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
                                    disabled
                                    required
                                />
                                <label>Correo</label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiCuenta