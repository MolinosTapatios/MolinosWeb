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

export const crearUsuario = ({ username, password, nombre, apaterno, amaterno, fechaNac, mail }) => {
  return new Promise((resolve, reject) => {
    conn.query('INSERT into usuarios values (null,?,?,?,?,?,?,?,1,2,1)',
      [username, md5(password), nombre, apaterno, amaterno, fechaNac, mail],
      (error, result, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
  })
}

export const inicioSesion = ({ username, user_id }) => {
  return new Promise((resolve, reject) => {
    conn.query('INSERT into actividad values (null,?,?,?,NOW())',
      [parseInt(user_id), `El usuario ${username} ha iniciado sesion`, 'Inicio de sesion'],
      (error, results, fields) => {
        if (error) {
          console.log('Error al registrar inicio de sesion ', { error })
        } else {
          console.log('Inicio de sesion registrado')
        }
      })
  })
}

export const cerrarSesion = ({ username, user_id }) => {
  return new Promise((resolve, reject) => {
    conn.query('INSERT into actividad values (null,?,?,?,NOW())',
      [parseInt(user_id), `El usuario ${username} ha cerrado sesion`, 'Cierre de sesion'],
      (error, results, fields) => {
        if (error) {
          console.log('Fallo al registrar cierre de sesion, Error: ', { error })
        } else {
          console.log('Cierre de sesion registrado')
          resolve(results)
        }
      })
  })
}