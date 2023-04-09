import md5 from "md5"
import conn from "./conexion.js"

export const validarUsuario = (username) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM usuarios WHERE username = ? and `as` = 1', [username], (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export const crearUsuario = ({username,password,nombre,apaterno,amaterno,fechaNac,mail}) => {
  return new Promise((resolve, reject) => {
    conn.query('INSERT into usuarios values (null,?,?,?,?,?,?,?,1,2,1)', [username,md5(password),nombre,apaterno,amaterno,fechaNac,mail], (error, result, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}