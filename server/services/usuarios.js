import conn from "./conexion.js"

export const validarUsuario = (username) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM usuarios WHERE username = ? and `as` = 1', [username], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results)
      }
    });
  });
}