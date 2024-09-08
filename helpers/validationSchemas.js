import Joi from "joi";

export const createBookSchema = Joi.object({
  isbn: Joi.string()
    .pattern(new RegExp("^\\d{3}-\\d-\\d{5}-\\d{3}-\\d$"))
    .required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  isBorrowed: Joi.boolean(),
});

export const updateBookSchema = Joi.object({
  isbn: Joi.string().pattern(new RegExp("^\\d{3}-\\d-\\d{5}-\\d{3}-\\d$")),
  title: Joi.string(),
  author: Joi.string(),
  isBorrowed: Joi.boolean(),
})
  .or("isbn", "title", "author")
  .messages({
    "object.missing": "Body must have at least one field",
  });
