import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";



const BlogPostsRouter = express.Router();

const BlogPostsPath = join(dirname(fileURLToPath(import.meta.url)), "BlogPosts.json")


// POST REQUEST

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



//GET REQUEST



BlogPostsRouter.get("/", (req, res) => {

    const BlogPostsArray =  JSON.parse(fs.readFileSync(BlogPostsPath))

    res.send(BlogPostsArray)
})



//GET REQUEST ++ ID


BlogPostsRouter.get("/:BlogPostId", (req, res) => {

    const BlogPostArray = JSON.parse(fs.readFileSync(BlogPostsPath))

    const BlogPostId = req.params.BlogPostId

    const selectedBlog = BlogPostArray.find((element) => element.id === BlogPostId)

    res.send(selectedBlog)
})



//PUT REQUEST
BlogPostsRouter.put("/:BlogPostId", (req, res) => {

    const BlogPostArray = JSON.parse(fs.readFileSync(BlogPostsPath))

    const index = BlogPostArray.findIndex(BlogPost => BlogPost.id === req.params.BlogPostId)
    const oldBlogPost = BlogPostArray[index]
    const updatedBlogPost = {...oldBlogPost, ...req.body, updatedAt: new Date()}

    BlogPostArray[index] = updatedBlogPost

    fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostArray))


res.send(updatedBlogPost)
})





//DELETE REQUEST + ID
BlogPostsRouter.delete("/:BlogPostId", (req, res) => {

    const BlogPostArray = JSON.parse(fs.readFileSync(BlogPostsPath))

    const BlogPostLeft = BlogPostArray.filter( BlogPost => BlogPost.id !== req.params.BlogPostId)

    fs.writeFileSync(BlogPostsPath, JSON.parse(BlogPostLeft))


    res.status(204)
    .send('Blog Post Deleted')

})



export default BlogPostsRouter