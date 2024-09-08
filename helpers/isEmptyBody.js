const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const error = new Error("Body cannot be empty");
    error.status = 400;
    return next(error);
  }
  next();
};

export default isEmptyBody;
