import conn from './conexion.js'

export const getAll = () => {
	return new Promise((resolve, reject) => {
		conn.query('select p.id,p.nombre, p.precio,p.stock, tp.nombre_tipo, p.status from productos as p join tipo_productos as tp on tp.id = p.Tipo_producto_id where p.`as` = 1;', function (error, results, fields) {
			if (error) {
				reject(error)
			} else {
				resolve(results)
			}
		})
	})
}

export const getHome = ({ tipo, limit }) => {
	return new Promise((resolve, reject) => {
		conn.query(`SELECT * from productos as p where p.Tipo_Producto_id = ${tipo} and p.\`as\` = 1 and p.status = 1 limit ${limit}`, function (error, results, fields) {

			if (error) {
				reject(error)

			} else {

				const promise = results.map(obj => {
					return new Promise((resolve, reject) => {
						conn.query(`SELECT * FROM imagenes WHERE productos_id = ${obj.id} and \`as\` = 1`, function (error, results, fields) {
							if (error) {
								reject(error)
							} else {
								obj.imagenes = results
								resolve()
							}
						})
					})
				})

				Promise.all(promise)
					.then(() => {
						resolve(results)
					})
					.catch((error) => {
						reject(error)
					})
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
				const promise = results.map(obj => {
					return new Promise((resolve, reject) => {
						conn.query(`SELECT * FROM imagenes WHERE productos_id = ${id} and \`as\` = 1`, function (error, results, fields) {
							if (error) {
								reject(error)
							} else {
								obj.imagenes = results
								resolve()
							}
						})
					})
				})

				Promise.all(promise)
					.then(() => {
						resolve(results)
					})
					.catch((error) => {
						reject(error)
					})
			}
		});
	});
}

export const crearProducto = ({ body, files }) => {
	const { nombre, descripcion, caracteristicas, precio, stock, status, tipo } = JSON.parse(body.producto)
	return new Promise((resolve, reject) => {
		// se inicia la transaccion
		conn.beginTransaction()
		conn.query(`INSERT INTO productos values (null,?,?,?,?,?,?,?,1)`,
			[nombre, descripcion, caracteristicas, precio, stock, parseInt(status), tipo],
			(error, results, fields) => {
				if (error) {
					conn.rollback()
					reject(error)
				} else {
					if (files.length > 0) {
						files.forEach(file => {
							conn.query(`INSERT INTO imagenes values(null,?,?,1)`,
								[results.insertId, `imagenes/${file.filename}`],
								(error, results, fields) => {
									if (error) {
										conn.rollback()
										reject(error)
									} else {
										conn.commit()
									}
								})
						})
					} else {
						conn.commit()
					}
					resolve(results.affectedRows)
				}
			})
	})
}

export const editarProducto = ({ body, files }) => {
	const { nombre, descripcion, caracteristicas, precio, stock, status, tipo, id } = JSON.parse(body.producto)
	return new Promise((resolve, reject) => {
		// se inicia la transaccion
		conn.beginTransaction()
		conn.query(`
      UPDATE productos set 
      nombre = ?, descripcion = ?, caracteristicas = ?, precio = ?, stock = ?, status = ?, Tipo_Producto_id = ?
      where id = ?`, [nombre, descripcion, caracteristicas, precio, stock, parseInt(status), tipo, id],
			(error, result, fields) => {
				if (error) {
					conn.rollback()
					reject(error)
				} else {
					if (files.length > 0) {
						files.forEach(file => {
							conn.query(`INSERT INTO imagenes values(null,?,?,1)`,
								[id, `imagenes/${file.filename}`],
								(error, result, fields) => {
									if (error) {
										conn.rollback()
										reject(error)
									} else {
										//se hace el comit de transaccion
										conn.commit()
									}
								})
						})
					} else {
						//se hace el comit de transaccion
						conn.commit()
					}
					resolve(result.affectedRows)
				}
			})
	})
}

export const deleteProduct = ({ id }) => {
	return new Promise((resolve, reject) => {
		conn.query(`UPDATE productos set \`as\` = 0 where id = ${id}`, function (error, results, fields) {
			if (error) {
				reject(error);
			} else {
				resolve(results.affectedRows)
			}
		});
	});
}