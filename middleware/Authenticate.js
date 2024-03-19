import jwt from 'jsonwebtoken';
import 'dotenv/config'
const { sign, verify } = jwt;

// Created webtoken function
function createToken(user) {
    return sign({
        userEmail: user.userEmail,
        userPass: user.userPass,
        userRole: user.userRole
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}


// verifying webtoken
function verifyAToken(req, res, next) {
    const token = req.headers.cookie.split(';')[0].split('=')[1];
    if (token) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
        } else {
            res.json({
                status: 401,
                msg: 'Please Login'
            })
        }
    } else {
        res.json({
            status: 401,
            msg: 'Please provide a token'
        })
    }
}


export { createToken, verifyAToken };
