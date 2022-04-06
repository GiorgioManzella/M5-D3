// const express = require("express") // OLD SYNTAX
import express from "express" // <-- NEW IMPORT SYNTAX (remember to add "type": "module" to package.json to use it!)
import listEndpoints from 'express-list-endpoints'
import authorsRouter from "./authors/index.js"
import cors from "cors"
import { genericErrorHandler } from "./authors/errorHandler.js"
import BlogPostsRouter from "./BlogPost/index.js"

const server = express()
const port = 3001



//middlewares

server.use(cors())
server.use(express.json())

//endopoints

server.use("/authors", authorsRouter)
server.use("/BlogPosts", BlogPostsRouter)

// error middlewares

server.use(genericErrorHandler)

server.listen(port, () => {

  console.table(listEndpoints(server))
  console.log(`server is running on ${port}`)
})



