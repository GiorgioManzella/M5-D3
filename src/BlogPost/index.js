import express from "express";
import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import createError from "http-errors";
import { CheckBlogPostSchema, CheckValidationResult } from "./validation.js";
import {
  getBlogPost,
  writeBlogPost,
  saveBlogSpotCovers,
} from "../lib/fs-tools.js";

import multer from "multer";

import { getPdfReadableStream } from "./downloadPDF.js";
import { pipeline } from "stream";

const BlogPostsRouter = express.Router();

const BlogPostsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../Data/BlogPosts.json"
);

// POST REQUEST-----------------------------------------------DONE----------------

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

// post with id for COMMENTS --------------------------------------WORKING--------------------

BlogPostsRouter.post(
  "/:BlogPostId/Comments",

  async (req, res, next) => {
    try {
      const BlogPostComment = {
        ...req.body,
        id: uniqid(),

        createAt: new Date(),
      };
      const BlogPostId = req.params.BlogPostId;
      const BlogPostArray = await getBlogPost();

      const selectedBlog = await BlogPostArray.find(
        (element) => element.id === BlogPostId
      );

      if (selectedBlog) {
        // can't use push as is an object--------------------selectedBlog.push(BlogPostComment);
        selectedBlog["comment"] = BlogPostComment;
        console.log(selectedBlog);
        writeBlogPost(BlogPostArray);
        res.status(201).send("New COmment has been added");
      }
    } catch (error) {
      next(error);
    }
  }
);

//GET REQUEST--------------------------------------------DONE--------------

BlogPostsRouter.get("/", async (req, res, next) => {
  try {
    const BlogPosts = await getBlogPost();
    res.send(BlogPosts);
  } catch (error) {
    next(error);
  }
});

//GET REQUEST ++ ID------------------------------------------DONE------------------

BlogPostsRouter.get("/:BlogPostId", async (req, res, next) => {
  try {
    const BlogPostsArray = await getBlogPost();

    const selectedBlog = BlogPostsArray.find(
      (element) => element.id === req.params.BlogPostId
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

//GET REQUEST ++ ID ++COMMENTS---------------------------------DONE--------------------

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

//PUT REQUEST---------------------------------------DONE-----------------------

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

//DELETE REQUEST + ID--------------------------------DONE------------------------

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

//POST METHOD Cover + ID

BlogPostsRouter.post(
  "/:BlogSpotsId/Cover",
  multer().single("Cover"),
  async (req, res, next) => {
    try {
      await saveBlogSpotCovers(
        `${req.params.blogPostsId}.gif`,
        req.file.buffer
      );

      const BlogPostArray = await getBlogPost();

      res.status(201).send({ message: "image Uploaded successfully" });
    } catch (error) {}
  }
);

// downloadPDF

BlogPostsRouter.get("/:BlogSportsId/DownloadPdf", (req, res, next) => {
  try {
    res.setHeader(
      'Content-Disposition", "attachment; filename=whatever.json.gz'
    );

    const source = getPdfReadableStream("hello");
    const transform = createGzip();
    const destination = res;

    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
});
