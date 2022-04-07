import { validationResult, checkSchema } from "express-validator";
import createError from "http-errors";

const BlogPostSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title not valid!",
    },
  },
};

export const CheckBlogPostSchema = checkSchema(BlogPostSchema);

export const CheckValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400), { message: "Title not valid" });
  } else {
    next();
  }
};
