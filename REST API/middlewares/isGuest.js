module.exports = (req, res, next) => {
    if (res.locals.user) {
        res.status(401).json({});
        return;
    }

    next();
}