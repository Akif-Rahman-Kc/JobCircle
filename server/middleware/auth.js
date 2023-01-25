import { verify } from 'jsonwebtoken';

export async function userJWT(req, res, next) {
    const token = req.body.headers.accessToken;
    if (!token) {
        console.log("You need token");
    } else {
        verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if (err) {
                console.log(err);
                res.json({auth:false,status:"failed"})
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
                res.json({auth:false,status:"failed"})
            } else {
                req.vendorId =decoded.vendorId
                next();
            }
        })
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function adminJWT(req, res, next) {
    const token = req.body.headers.accessAdminToken;
    if (!token) {
        console.log("You need token");
    } else {
        verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if (err) {
                console.log(err);
                res.json({auth:false,status:"failed"})
            } else {
                req.adminId =decoded.adminId
                next();
            }
        })
    }
}