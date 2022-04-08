import express from "express";
import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import createError from "http-errors";
import { CheckBlogPostSchema, CheckValidationResult } from "./validation.js";
import { getBlogPost, writeBlogPost } from "../lib/fs-tools.js";

const BlogPostsRouter = express.Router();

const BlogPostsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../Data/BlogPosts.json"
);

// POST REQUEST

BlogPostsRouter.post(
  "/",

  CheckBlogPostSchema,
  CheckValidationResult,
  async (req, res, next) => {
    try {
      const BlogPost = {
        ...req.body,

        id: uniqid(),

        createAt: new Date(),
      };

      console.log(`New blogPost has been added : ${req.body.title}`);

      const BlogPostArray = await getBlogPost();

      BlogPostArray.push(BlogPost);
      writeBlogPost(BlogPostArray);

      res.status(201).send("New post created!");
    } catch (error) {
      next(error);
    }
  }
);

// post with id for image
BlogPostsRouter.post(
  "/:BlogPostId",

  async (req, res, next) => {
    try {
      const BlogPost = {
        ...req.body,
        id: uniqid(),

        createAt: new Date(),
      };

      console.log(`New blogPost has been added : ${req.body.title}`);

      const BlogPostArray = await getBlogPost();

      BlogPostArray.push(BlogPost);
      writeBlogPost(BlogPostArray);

      res.status(201).send("New post created!");
    } catch (error) {
      next(error);
    }
  }
);
//GET REQUEST

BlogPostsRouter.get("/", async (req, res, next) => {
  try {
    const BlogPosts = await getBlogPost();
    res.send(BlogPosts);
  } catch (error) {
    next(error);
  }
});

//GET REQUEST ++ ID

BlogPostsRouter.get("/:BlogPostId", async (req, res, next) => {
  try {
    const BlogPostId = req.params.BlogPostId;

    const BlogPostsArray = await getBlogPost();

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

//GET REQUEST ++ ID ++COMMENTS

BlogPostsRouter.get("/:BlogPostId/Comments", async (req, res, next) => {
  try {
    const BlogPostId = req.params.BlogPostId;

    const BlogPostsArray = await getBlogPost();

    const selectedBlog = BlogPostsArray.find(
      (element) => element.id === BlogPostId
    );

    if (selectedBlog) {
      res.send(selectedBlog.comments);
    } else {
      next(createError(404, `Blog post ${req.params.BlogPostId} not found `));
    }
  } catch (error) {
    next(error);
  }
});

//PUT REQUEST
BlogPostsRouter.put("/:BlogPostId", async (req, res, next) => {
  try {
    const BlogPostArray = await getBlogPost();
    const index = await BlogPostArray.findIndex(
      (BlogPost) => BlogPost.id === req.params.BlogPostId
    );
    const oldBlogPost = BlogPostArray[index];
    const updatedBlogPost = {
      ...oldBlogPost,
      ...req.body,
      updatedAt: new Date(),
    };

    BlogPostArray[index] = updatedBlogPost;

    await writeBlogPost(BlogPostArray);

    res.send(updatedBlogPost);
  } catch (error) {
    next(error);
  }
});

//DELETE REQUEST + ID
BlogPostsRouter.delete("/:BlogPostId", async (req, res, next) => {
  try {
    const BlogPostsArray = await getBlogPost();
    const BlogPostLeft = await BlogPostsArray.filter(
      (BlogPost) => BlogPost.id !== req.params.BlogPostId
    );

    fs.writeFileSync(BlogPostsPath, JSON.stringify(BlogPostLeft));
    await writeBlogPost(BlogPostsArray);
    console.log("deleted");
    res.status(204).send({ message: "Blog Post Deleted" });
  } catch (error) {
    next(error);
  }
});

export default BlogPostsRouter;
