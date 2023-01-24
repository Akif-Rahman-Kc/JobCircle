import { verify } from 'jsonwebtoken';

export async function userJWT(req, res) {
    const token = req.headers["x-access-token"];
    console.log(req.body);
    if (!token) {
        console.log("You need token");
    } else {
        verify(token);
    }
}