import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";


const authorsRouter = express.Router();


const currentFilePath = fileURLToPath(import.meta.url);
const parentFolder = dirname(currentFilePath);
const authorsJsonPath = join(parentFolder, "authors.json");








authorsRouter.post("/", (req, res) => {

  console.log(req.body);
  const newAuthor = {
    ...req.body,
    createAt: new Date(),
    id: uniqid(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    DoB: req.body.email,
    avatar: req.body.avatar,
  };

  const authorsArray = JSON.parse(fs.readFileSync(authorsJsonPath))

  authorsArray.push(newAuthor)

  fs.writeFileSync(authorsJsonPath, JSON.stringify(authorsArray))


  res.status(201)
  .send({id: newAuthor})
});






authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJsonPath);

  const authorsArray = JSON.parse(fileContent);

  res.send(authorsArray);
});




authorsRouter.get("/:authorsId", (req, res) => {

    const authorId = req.params.authorsId

    const authorsArray = JSON.parse(fs.readFileSync(authorsJsonPath))
    
    const currentAuthor = authorsArray.find((author) => author.id === authorId)
    
res.send(currentAuthor)



});




authorsRouter.put("/:authorsId", (req, res) => {

    
    const authorsArray = JSON.parse(fs.readFileSync(authorsJsonPath))
    const currentAuthor = authorsArray.findIndex((author) => author.id === req.params.authorsId)
    const oldAuthor = authorsArray[currentAuthor]
    const updatedAuthor = {...oldAuthor, ...req.body, updatedAt: new Date()}



    res.send(updatedAuthor)
});





authorsRouter.delete("/:authorsId", (req, res) => {

    const authorId = req.params.authorsId
    const authorsArray = JSON.parse(fs.readFileSync(authorsJsonPath))
    const remainingAuthors = authorsArray.filter((author) => author.id !== authorId)
    
    res.send(remainingAuthors)

});


export default authorsRouter;

