module.exports = (req, res, next) => {
    console.log(res.locals.user)
    if (!res.locals.user) {
        res.status(401).json({});
        return;
    }

    next();
}