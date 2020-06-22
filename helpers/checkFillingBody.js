const checkFillingBody = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing fields",
    });
    return;
  }
  next();
};

export default checkFillingBody;
