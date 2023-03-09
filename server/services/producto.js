import conn from './conexion.js'

export const getAll = () => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM vw_catalogo', function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export const getHome = ({ tipo, limit }) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * from productos where Tipo_Producto_id = ${tipo} and \`as\` = 1 and status = 1 limit ${limit}`, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export const crearProducto = ({ nombre, descripcion, caracteristicas, precio, stock, status, tipo }) => {
  // se inicia la transaccion
  // conn.beginTransaction()
  const result = conn.query(`INSERT INTO productos values (null,?,?,?,?,?,?,?,1)`, [nombre, descripcion, caracteristicas, precio, stock, status, tipo])
  console.log("El id del producto insertado es: ")
  console.log(result)

  // return result
  // console.log(result[0].insertId)s
  //se hace el comit
  // conn.commit()
}