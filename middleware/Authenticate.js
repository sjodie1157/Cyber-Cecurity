import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { json } from 'express';
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

function verifyAdminToken(req, res, next) {
    const token = req.headers.cookie.split(';')[0].split('=')[1];
    let cookieString = req.headers.cookie;
    let cookies = cookieString.split(';')[1].split('=')[1];
    let admin = JSON.parse(cookies).userRole

    if (token && admin) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
        } else {
            res.json({
                status: 401,
                msg: 'Your Not an Admin'
            })
        }
    } else {
        res.json({
            status: 401,
            msg: 'Your Not logged In'
        })
    }
}

export { createToken, verifyAToken, verifyAdminToken };
