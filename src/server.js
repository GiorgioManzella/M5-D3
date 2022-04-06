// const express = require("express") // OLD SYNTAX
import express from "express" // <-- NEW IMPORT SYNTAX (remember to add "type": "module" to package.json to use it!)
import listEndpoints from 'express-list-endpoints'
import authorsRouter from "./authors/index.js"
import cors from "cors"
import { genericErrorHandler } from "./errorHandler.js"
import BlogPostsRouter from "./BlogPost/index.js"
import { badRequestErrorHandler, unauthorizedErrorHandler, notFoundErrorHandler } from "./errorHandler.js"


const server = express()
const port = 3001



//middlewares

server.use(cors())
server.use(express.json())

//endopoints

server.use("/authors", authorsRouter)
server.use("/BlogPosts", BlogPostsRouter)

// error middlewares


server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500

server.listen(port, () => {

  console.table(listEndpoints(server))
  console.log(`server is running on ${port}`)
})



