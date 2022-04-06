


export const badRequestErrorHandler = (err, req, res, next) => {

    console.log('this is the error', err)

    if(err.status === 400){
        res.status(400)
        .send({message: "err.message", error: "err.errorsList"})
    }else{
        next(err)
    }
}

export const unauthorizedErrorHandler = (err, req, res, next) => {

    console.log('this is the error', err)

    if(err.status === 401){
        res.status(401)
        .send({message: "err.message", error: "err.errorsList"})
    }else{
        next(err)
    }



}


export const BadAssError = (err,req,res,next) =>{

    if(err.status === 9990){
        res.status(9999).send(err.status, `It's over 9000!!!`)
    }else{
        next(err)
 }}

export const notFoundErrorHandler = (err, req, res, next) => {
    // if I am responsible of the error I will send the response
    // otherwise next(err)
    if (err.status === 404) {
      res.status(404).send({ message: err.message || "Not found!" })
    } else {
      next(err)
    }
  }

export const genericErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({message:"generic server error"})
    
}