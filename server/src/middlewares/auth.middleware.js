const { verify } = require("jsonwebtoken")

const auth = (req, res, next) => {
    const { authToken } = req?.cookies || {};
    if (!authToken) return res.status(401).send({ message: "Unauthorized!" });
    const [, token] = authToken.split(" ");
    if (!token) return res.status(401).send({ message: "Unauthorized!" });
    verify(token, process.env.JWT_KEY, {
        algorithms: ['HS256'],
    }, (err, payload) => {
        if (err) return res.status(401).send({ message: "Unauthorized!" });
        req.user = payload;
        next();
    })
}

module.exports = auth;