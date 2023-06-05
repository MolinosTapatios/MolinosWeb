import dotenv from 'dotenv'
import express from "express"
import md5 from "md5"
import jwt from "jsonwebtoken"
import * as usuariosServices from '../services/usuarios.js'
import userExtractor from '../middleware/userExtractor.js'

dotenv.config();

const router = express.Router()

//valida el usuario
router.post('/log', (_req, res) => {

  const { username, password } = _req.body

  usuariosServices.validarUsuario(username)
    .then(results => {

      if (!(results.length > 0 && md5(password) === results[0].password)) {
        res.status(401).json({
          error: "Usuario o contraseña invalidos"
        })
      } else {

        usuariosServices.inicioSesion({ user_id: results[0].id, username: results[0].nombre })

        const userForToken = {
          id: results[0].id,
          tipo: results[0].tipo_usuario_id,
          username: results[0].username
        }

        const token = jwt.sign(userForToken, process.env.SECURITY)

        res.send({
          nombre: results[0].nombre,
          token: token,
          tipo: results[0].tipo_usuario_id
        })
      }

    })
    .catch(error => {
      console.error('Ha ocurrido un error en el servidor:', error)
      res.status(500).send({ error: 'Ha ocurrido un error en el servidor' })
    })
})

//crea un usuario
router.post('/', (_req, res) => {

  const { _username, _password, _nombre, _apaterno, _amaterno, _fechaNac, _mail } = _req.body

  usuariosServices.crearUsuario({
    amaterno: _amaterno,
    apaterno: _apaterno,
    fechaNac: _fechaNac,
    mail: _mail,
    nombre: _nombre,
    password: _password,
    username: _username
  })
    .then(results => {
      if (results.affectedRows > 0) {
        res.status(201).send({ msg: 'Usuario creado correctamente' })
      } else {
        res.status(406).send({ error: 'Error al crear usuario' })
      }
    })
    .catch(error => {
      // console.error(error)
      res.status(500).send({ error: 'Ha ocurrido un error en el servidor' })
    })
})

router.delete('/logout', userExtractor, (_req, _res) => {
  const { userId, username } = _req
  usuariosServices.cerrarSesion({ user_id:userId, username:username })
    .then(() => {
      _res.status(204).send()
    })
})

export default router