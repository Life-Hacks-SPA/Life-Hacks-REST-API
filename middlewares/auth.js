const { SESSION, JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")


module.exports = async (req, res, next) => {
    let token = req.headers[SESSION]

    if (token) {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                res.locals.user = "";
                return;
            }

            res.locals.user = decoded;
        });
    }

    next();
}