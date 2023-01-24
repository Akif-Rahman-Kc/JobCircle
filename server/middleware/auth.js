const jwt = require('jsonwebtoken')

module.exports = {
    userJWT: async (req, res) => {
        const token = req.headers["x-access-token"]
        console.log(req.body);
        if (!token) {
            console.log("You need token");
        } else {
            jwt.verify(token)
        }
    }
}