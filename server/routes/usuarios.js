import dotenv from 'dotenv'
import express from "express"
import md5 from "md5"
import jwt from "jsonwebtoken"
import * as usuariosServices from '../services/usuarios.js'

dotenv.config();

const router = express.Router()

router.post('/', (_req, res) => {

  const { username, password } = _req.body

  usuariosServices.validarUsuario(username)
    .then(results => {
      
      console.log(results)

      if (!(results.length > 0 && md5(password) === results[0].password)) {
        res.status(401).json({
          error: "Usuario o contraseña invalidos"
        })
      } else {

        const userForToken = {
          id : results[0].id,
          tipo: results[0].tipo_usuario_id,
          username : results[0].username
        }

        const token = jwt.sign(userForToken,process.env.SECURITY)

        res.send({
          nombre: results[0].nombre,
          token : token,
          username: results[0].username,
          tipo: results[0].tipo_usuario_id
        })
      }

    })
    .catch(error => {
      console.error('Ha ocurrido un error en el servidor:', error)
      res.status(500).send('Ha ocurrido un error en el servidor')
    })
})

export default router