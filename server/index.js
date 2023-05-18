import express, { response } from "express"
import http from "http"
import morgan from "morgan"
import { Server as SocketServer } from "socket.io"
// import { join, dirname } from "path"
// import { fileURLToPath } from "url"
import cors from "cors"

import { PORT } from "./config.js"
import productos from './routes/producto.js'
import usuarios from './routes/usuarios.js'

// Initializations
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})
// const __dirname = dirname(fileURLToPath(import.meta.url))

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))

// app.use(express.static(join(__dirname, "../cliente/build")))
app.use('/imagenes',express.static('server/public/imagenes'))

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8),
    })
  })
})

app.use(express.json())

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!')
  res.send('pong')
})

app.use('/api/productos', productos )

app.use('/api/usuarios', usuarios )

app.use((_request,respons)=>{
  respons.status(404).json({
    error:'Not fund'
  })
})

app.use((err, req, res, next) => {
  if(err.code === 'LIMIT_FILE_SIZE'){
    res.status(413).send({error:'Archivos exeden la capacidad'})
  }else{
    res.status(500).send({error:'Something broke!'})
  }
  console.log({err})
})

server.listen(PORT)
console.log(`server on port ${PORT}`)