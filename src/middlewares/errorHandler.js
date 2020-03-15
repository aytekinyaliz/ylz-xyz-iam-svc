module.exports = function errorHandler(err, req, res, next) {
  console.error('ERROR HANDLED:', err);

  return res.status(500).json({ message: 'Error occured' });
};
