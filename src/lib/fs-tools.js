import { writeJSON } from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../Data");
const BlogPostsPath = join(dataFolderPath, "/BlogPosts.js");
const AuthorsPath = join(dataFolderPath, "/authors.js");

export const getBlogPost = () => readJSON(BlogPostsPath);
export const writeBlogPost = () => writeJSON(BlogPostsPath, content);
export const getAuthors = () => readJSON(AuthorsPath);
export const writeAuthors = () => writeJSON(AuthorsPath, content);
