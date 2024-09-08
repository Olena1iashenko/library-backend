const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const error = new Error("Body cannot be empty");
      error.status = 400;
      return next(error);
    }
    next();
  };

  return func;
};

export default validateBody;
