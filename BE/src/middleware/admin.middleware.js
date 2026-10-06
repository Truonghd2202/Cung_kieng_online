function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden", errors: [] });
    }
    return next();
  };
}

module.exports = authorizeRoles;
module.exports.authorizeRoles = authorizeRoles;
