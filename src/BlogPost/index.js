import express from "express";
import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import createError from "http-errors";
import { CheckBlogPostSchema, CheckValidationResult } from "./validation.js";

const BlogPostsRouter = express.Router();

const BlogPostsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../Data/BlogPosts.json"
);

const BlogPostsArray = JSON.parse(fs.readFileSync(BlogPostsPath));

const writeBlogPost = (content) =>
  fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostsArray));

// POST REQUEST

const async = () =>
  BlogPostsRouter.post(
    "/",
    CheckBlogPostSchema,
    CheckValidationResult,
    (req, res, next) => {
      try {
        const BlogPost = {
          ...req.body,

          id: uniqid(),
          category: req.body.category,
          title: req.body.title,
          cover: req.body.cover,
          readTime: {
            value: req.body.readTime.value,
            unit: req.body.readTime.unit,
          },
          author: {
            name: req.body.author.name,
            avatar: req.body.author.avatar,
          },
          content: BlogPostsPath,
          createAt: new Date(),
        };

        console.log(`New blogPost has been added : ${req.body.title}`);

        BlogPostsArray.push(BlogPost);
        writeBlogPost(BlogPostsArray);

        res.status(201).send("New post created!");
      } catch (error) {
        next(error);
      }
    }
  );

//GET REQUEST

BlogPostsRouter.get("/", async (req, res, next) => {
  try {
    const BlogPosts = await BlogPostsArray;
    res.send(BlogPostsArray);
  } catch (error) {
    next(error);
  }
});

//GET REQUEST ++ ID

BlogPostsRouter.get("/:BlogPostId", (req, res, next) => {
  try {
    const BlogPostId = req.params.BlogPostId;

    const selectedBlog = BlogPostsArray.find(
      (element) => element.id === BlogPostId
    );

    if (selectedBlog) {
      res.send(selectedBlog);
    } else {
      next(createError(404, `Blog post ${req.params.BlogPostId} not found `));
    }
  } catch (error) {
    next(error);
  }
});

//PUT REQUEST
BlogPostsRouter.put("/:BlogPostId", (req, res, next) => {
  try {
    const index = BlogPostArray.findIndex(
      (BlogPost) => BlogPost.id === req.params.BlogPostId
    );
    const oldBlogPost = BlogPostsArray[index];
    const updatedBlogPost = {
      ...oldBlogPost,
      ...req.body,
      updatedAt: new Date(),
    };

    BlogPostsArray[index] = updatedBlogPost;

    fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostArray));

    res.send(updatedBlogPost);
  } catch (error) {
    next(error);
  }
});

//DELETE REQUEST + ID
BlogPostsRouter.delete("/:BlogPostId", (req, res, next) => {
  try {
    const BlogPostLeft = BlogPostsArray.filter(
      (BlogPost) => BlogPost.id !== req.params.BlogPostId
    );

    fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostLeft));
    console.log("deleted");
    res.status(204).send({ message: "Blog Post Deleted" });
  } catch (error) {
    next(error);
  }
});

export default BlogPostsRouter;
