import dotenv from 'dotenv'
import express from "express"
import multer from 'multer'
// import userExtractor from '../middleware/userExtractor.js';
import * as productoServices from '../services/producto.js'
dotenv.config()
const upload = multer()

const router = express.Router()

//retorna todos los productos
router.get('/',async (_req, res) => {
  try {
    const results = await productoServices.getAll()
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Ha ocurrido un error en el servidor'})
  }
})

//retorna productos de un tipo y con un limite
router.get('/:tipo/:limit', async (_req, res) => {
  try {
    const results = await productoServices.getHome({ tipo: _req.params.tipo, limit: _req.params.limit })
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Ha ocurrido un error en el servidor'})
  }
})

//crea un producto
router.post('/', async (_req, res) => {
  try {
    const results = await productoServices.crearProducto(_req.body)
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Ha ocurrido un error en el servidor'})
  }
})

//edita un producto
router.put('/', upload.array('images', 10),async (_req, res) => {
  try {
    const results = await productoServices.editarProducto({body:_req.body,files:_req.files})
    if(results > 0){
      res.send({msg:'Producto editado correctamente'})
    }else{
      res.send({error:'error al editar el producto'})
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Ha ocurrido un error en el servidor'})
  }
})

//retorna informacion de un solo producto
router.get('/:id/', async (_req, res) => {
  try {
    const results = await productoServices.getSingleProduct({ id: _req.params.id})
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send({error:'Ha ocurrido un error en el servidor'})
  }
})

export default router