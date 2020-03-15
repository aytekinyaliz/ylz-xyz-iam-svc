
module.exports = function pageNotFoundHandler (req, res, next) {
  return res.locals.isHit 
    ? next() 
    : res.status(404).json({ message: 'Not found' });;
}