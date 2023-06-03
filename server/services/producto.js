import conn from './conexion.js'

export const getAll = () => {
  return new Promise((resolve, reject) => {
    conn.query('select p.id,p.nombre, p.precio,p.stock, tp.nombre_tipo, p.status from productos as p join tipo_productos as tp on tp.id = p.Tipo_producto_id where p.`as` = 1;', function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        console.log(results)
        resolve(results)
      }
    })
  })
}

export const getHome = ({ tipo, limit }) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * from productos as p left join imagenes as i on p.id = i.productos_id where p.Tipo_Producto_id = ${tipo} and p.\`as\` = 1 and p.status = 1 limit ${limit}`, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export const getSingleProduct = ({ id }) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * from productos where id = ${id}`, function (error, results, fields) {
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
  // return result
  // console.log(result[0].insertId)s
  //se hace el comit
  // conn.commit(

}

export const editarProducto = ({ body, files }) => {
  const { nombre, descripcion, caracteristicas, precio, stock, status, tipo, id } = JSON.parse(body.producto)
  return new Promise((resolve, reject) => {
    // se inicia la transaccion
    conn.beginTransaction()
    conn.query(`UPDATE productos set nombre = ?, descripcion = ?, caracteristicas = ?, precio = ?, stock = ?, status = ?, Tipo_Producto_id = ? where id = ?`, [nombre, descripcion, caracteristicas, precio, stock, parseInt(status), tipo, id], (error, result, fields) => {
      if (error) {
        conn.rollback()
        reject(error)
      } else {
        if (files.length > 0) {
          console.log({ files })
          conn.query(`INSERT INTO imagenes values(null,?,?,1)`, [id, `imagenes/${files.filename}`], (error, result, fields) => {
            if (error) {
              conn.rollback()
              reject(error)
            } else {
              //se hace el comit de transaccion
              conn.commit()
            }
          })
        } else {
          //se hace el comit de transaccion
          conn.commit()
          console.log(files.length)
        }
        resolve(result.affectedRows)
      }
    })
  })
}