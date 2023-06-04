import dotenv from 'dotenv'
import express from "express"
import multer from 'multer'
import path from 'path'
// import userExtractor from '../middleware/userExtractor.js';
import * as productoServices from '../services/producto.js'

dotenv.config()
const error_server = 'Ha ocurrido un error en el servidor'

const storage = multer.diskStorage({
  destination: 'server/public/imagenes',
  filename: (req, file, cb) => {
    const date = new Date;
    const formattedDate = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    cb(null, `img_${formattedDate}_${randomString}` + path.extname(file.originalname));
  }
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {

    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb({ error: "File upload only supports the following filetypes - " + filetypes });
  },
  //limite de 2 MB
  limits: { fileSize: 1024 * 1024 * 3 }
}).array('images', 10)

const router = express.Router()

//retorna todos los productos
router.get('/', async (_req, res) => {
  try {
    const results = await productoServices.getAll()
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error_server })
  }
})

//retorna productos de un tipo y con un limite
router.get('/:tipo/:limit', async (_req, res) => {
  try {
    const results = await productoServices.getHome({ tipo: _req.params.tipo, limit: _req.params.limit })
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error_server })
  }
})

//crea un producto
router.post('/', upload, async (_req, res) => {
  try {
      const results = await productoServices.crearProducto({ body: _req.body, files: _req.files })
      if (results > 0) {
        console.log('true')
        res.send({ msg: 'Producto creado correctamente' })
      } else {
        console.log('false')
        res.send({ error: 'error al crear el producto' })
      }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error_server })
  }
})

// app.post('/upload', (req, res) => {
//   upload(req, res, function (err) {
//     if (err) {
//       // Verificar si el error es por tamaño de archivo excedido
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         console.log('El archivo excede el límite de 3MB:', req.file.originalname);
//       } else {
//         console.error(err);
//       }
//     } else {
//       console.log('Archivo subido correctamente');
//     }
//   });
// });

//edita un producto
router.put('/', upload, async (_req, res) => {
  try {
    const results = await productoServices.editarProducto({ body: _req.body, files: _req.files })
    if (results > 0) {
      res.send({ msg: 'Producto editado correctamente' })
    } else {
      res.send({ error: 'error al editar el producto' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error_server })
  }
})

//retorna informacion de un solo producto
router.get('/:id/', async (_req, res) => {
  try {
    const results = await productoServices.getSingleProduct({ id: _req.params.id })
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error_server })
  }
})

export default router