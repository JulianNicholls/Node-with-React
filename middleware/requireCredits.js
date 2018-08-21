module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: 'You must have more credits to perform that action' });
  }

  next();
};
