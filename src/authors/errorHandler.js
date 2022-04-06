export const genericErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({message:"generic server error"})
    
}