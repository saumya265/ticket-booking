const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.incudes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. you do not have the required role."});
    }
    next();
};

module.exports = roleMiddleware;