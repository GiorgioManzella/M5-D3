import {body, checkSchema} from "express-validation"


const BlogPostSchema = {

        title: {
            in: ["body"],
            isString:{
                errorMessage: "Title not valid!"
            }
        }
}