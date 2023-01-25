import { verify } from 'jsonwebtoken';

export async function userJWT(req, res, next) {
    const token = req.body.headers.accessToken;
    if (!token) {
        console.log("You need token");
    } else {
        verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if (err) {
                console.log(err);
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            } else {
                req.userId =decoded.userId
                next();
            }
        })
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorJWT(req, res, next) {
    const token = req.body.headers.accessVendorToken;
    if (!token) {
        console.log("You need token");
    } else {
        verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if (err) {
                console.log(err);
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            } else {
                req.vendorId =decoded.vendorId
                next();
            }
        })
    }
}