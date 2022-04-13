import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../Data");
const BlogPostsPath = join(dataFolderPath, "/BlogPosts.json");
const AuthorsPath = join(dataFolderPath, "/authors.json");

//-------------------------------------path for inner folders with data---------------------

const BlogSpotPubblicFolderPath = join(
  process.cwd(),
  "./public/coverImg/BlogPosts"
);

const authorsPubblicFolderPath = join(
  process.cwd(),
  "./public/avatarImg/authors"
);
console.log(authorsPubblicFolderPath);
//-----------directory functional paths------------------

//-=--------------BlogPosts------------------------

export const getBlogPost = () => readJSON(BlogPostsPath);
export const writeBlogPost = (content) => writeJSON(BlogPostsPath, content);
export const saveBlogSpotCovers = (filename, contentAsBuffer) =>
  writeFile(join(BlogSpotPubblicFolderPath, filename), contentAsBuffer);

//--------------Authors--------------------------

export const getAuthors = () => readJSON(AuthorsPath);
export const writeAuthors = (content) => writeJSON(AuthorsPath, content);
export const storeAuthorsAvatars = (filename, contentAsBuffer) =>
  writeFile(join(authorsPubblicFolderPath, filename), contentAsBuffer);

//

export const getPdfReadableStream = () => fs.createReadStream(BlogPostsPath);
