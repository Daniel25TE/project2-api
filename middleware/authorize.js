module.exports = function(requiredRole) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { role } = req.user;
    if (requiredRole === 'customer' && role === 'customer') return next();
    if (requiredRole === 'admin' && role === 'admin') return next();

    return res.status(403).json({ error: 'Forbidden' });
  };
};