export const genericErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.statue(500).send({message:"generic server error"})
    
}