import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";



const BlogPostsRouter = express.Router();

const BlogPostsPath = join(dirname(fileURLToPath(import.meta.url)), "BlogPosts.json")




BlogPostsRouter.post("/", (req, res) => {


    


    const BlogPost = {
        ...req.body,
        
        id: uniqid(),
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: {
                value: req.body.readTime.value,
                unit: req.body.readTime.unit
        },
        author:{
                name: req.body.author.name,
                avatar: req.body.author.avatar
        },
        content: BlogPostsPath,
        createAt: new Date(),
    }

    console.log(`New blogPost has been added : ${req.body.title}`)

    const BlogPostsArray =  JSON.parse(fs.readFileSync(BlogPostsPath))
    console.log('LOOOOOOOOOOOOOOOOOO', BlogPostsArray)
    BlogPostsArray.push(BlogPost)
    fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostsArray))



    res.status(201)
    .send('New post created!')

})
BlogPostsRouter.get("/", (req, res) => {})
BlogPostsRouter.get("/", (req, res) => {})
BlogPostsRouter.put("/", (req, res) => {})
BlogPostsRouter.delete("/", (req, res) => {})



export default BlogPostsRouter