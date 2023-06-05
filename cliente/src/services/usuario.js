import { URL } from "./config"

const apiURL = `${URL}/api/usuarios`

class Usuario {

    constructor({ id = null, username=null, password = null, nombre = null, apaterno = null, amaterno = null, fechaNac = null, mail = null, tipo = null, as = null }) {
        this._id = id
        this._username = username
        this._password = password
        this._nombre = nombre
        this._apaterno = apaterno
        this._amaterno = amaterno
        this._fechaNac = fechaNac
        this._mail = mail
        this._tipo = tipo
        this._as = as
    }

    set id(id) {
        this._id = id
    }
    get id() {
        return this._id
    }
    set username(username) {
        this._username = username
    }
    get username() {
        return this._username
    }
    set password(password) {
        this._password = password
    }
    get password() {
        return this._password
    }
    set nombre(nombre) {
        this._nombre = nombre
    }
    get nombre() {
        return this._nombre
    }
    set apaterno(apaterno) {
        this._apaterno = apaterno
    }
    get apaterno() {
        return this._apaterno
    }
    set amaterno(amaterno) {
        this._amaterno = amaterno
    }
    get amaterno() {
        return this._amaterno
    }
    set fechaNac(fechaNac) {
        this._fechaNac = fechaNac
    }
    get fechaNac() {
        return this._fechaNac
    }
    set mail(mail) {
        this._mail = mail
    }
    get mail() {
        return this._mail
    }
    set tipo(tipo) {
        this._tipo = tipo
    }
    get tipo() {
        return this._tipo
    }
    set as(as) {
        this._as = as
    }
    get as() {
        return this._as
    }
    //----------------------------------------------------------------
    //----------obtener info del usuario------------------
    //----------------------------------------------------------------
    getUsuario(u){
        return fetch(apiURL,{
            body:JSON.stringify({
                accion : "getUsuario",
                usuario : u
            }),
            method:'POST'
        })
        .then(resp => resp.json())
        .then(resp => {
            return resp
        })
    }
    //----------------------------------------------------------------
    //----------Crear nuevo usuario------------------
    //----------------------------------------------------------------
    crearUsuario(u) {

        return fetch(apiURL, {
            method: 'POST',
            body: JSON.stringify(u),
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => {
                return resp
            })
    }
    //----------------------------------------------------------------
    //----------Validar usuario------------------
    //----------------------------------------------------------------
    login(u) {

        const usuario = new Usuario(u)
        return fetch(`${apiURL}/log`, {
            body: JSON.stringify({
                // accion : "validarUsuario",
                username : usuario._username,
                password: usuario._password
            }),// body data type must match "Content-Type" header
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*' 
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'origin-when-cross-origin' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

        })
            .then(resp => resp.json())
            .then(resp => {return resp})
            .catch("Error en el servidor")
    }

    logout({token}) {
        console.log('Bearer ' + token)
        return fetch(`${apiURL}/logout`,{
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

export default Usuario