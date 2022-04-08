import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../Data");
const BlogPostsPath = join(dataFolderPath, "/BlogPosts.json");
const AuthorsPath = join(dataFolderPath, "/authors.json");

export const getBlogPost = () => readJSON(BlogPostsPath);
export const writeBlogPost = (content) => writeJSON(BlogPostsPath, content);
export const getAuthors = () => readJSON(AuthorsPath);
export const writeAuthors = (content) => writeJSON(AuthorsPath, content);

export const saveAuthorsAvatars = (filename, contentAsBuffer) =>
  writeFile(join(authorPubblicFolderPath, filename), contentAsBuffer);

export const saveBlogSpotCovers = (filename, contentAsBuffer) =>
  writeFile(join(BlogSpotPubblicFolderPath, filename), contentAsBuffer);
